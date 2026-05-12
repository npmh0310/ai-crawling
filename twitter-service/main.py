import asyncio
import base64
import json
import os
from contextlib import asynccontextmanager
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from playwright.async_api import async_playwright, BrowserContext

load_dotenv()

COOKIES_FILE = os.getenv("TWITTER_COOKIES_FILE", "cookies.json")
COOKIES_B64 = os.getenv("TWITTER_COOKIES_B64", "")
HEADLESS = os.getenv("HEADLESS", "true").lower() == "true"


def _load_cookies():
    if COOKIES_B64:
        return json.loads(base64.b64decode(COOKIES_B64))
    if os.path.exists(COOKIES_FILE):
        with open(COOKIES_FILE) as f:
            return json.load(f)
    raise RuntimeError(
        f"No cookies available. Set TWITTER_COOKIES_B64 env or place {COOKIES_FILE}. "
        f"Run: python save_cookies.py"
    )

_context: Optional[BrowserContext] = None
_playwright = None
_browser = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _context, _playwright, _browser

    cookies = _load_cookies()

    _playwright = await async_playwright().start()
    _browser = await _playwright.chromium.launch(
        headless=HEADLESS,
        args=[
            "--disable-blink-features=AutomationControlled",
            "--no-sandbox",
        ],
    )

    _context = await _browser.new_context(
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        locale="en-US",
        viewport={"width": 1280, "height": 800},
    )
    await _context.add_init_script(
        "Object.defineProperty(navigator, 'webdriver', { get: () => undefined });"
    )
    await _context.add_cookies(cookies)

    yield

    await _context.close()
    await _browser.close()
    await _playwright.stop()


app = FastAPI(lifespan=lifespan)


@app.get("/health")
async def health():
    return {"status": "ok"}


def _parse_tweets(data: dict, handle: str, since_id: Optional[str]) -> list:
    tweets = []
    result = data.get("data", {}).get("user", {}).get("result", {})
    # API returns either timeline_v2 or timeline depending on account tier
    timeline_root = result.get("timeline_v2") or result.get("timeline") or {}
    instructions = timeline_root.get("timeline", {}).get("instructions", [])
    for inst in instructions:
        for entry in inst.get("entries", []):
            content = entry.get("content", {})
            item = content.get("itemContent", {})
            tweet_result = item.get("tweet_results", {}).get("result", {})
            legacy = tweet_result.get("legacy", {})
            if not legacy:
                continue
            tweet_id = legacy.get("id_str", "")
            if not tweet_id:
                continue
            if since_id and tweet_id <= since_id:
                continue
            full_text = legacy.get("full_text", "")
            if legacy.get("retweeted_status_id_str") or full_text.startswith("RT @"):
                continue
            tweets.append({
                "id": tweet_id,
                "text": full_text,
                "created_at": legacy.get("created_at", ""),
                "url": f"https://x.com/{handle}/status/{tweet_id}",
                "metrics": {
                    "like_count": legacy.get("favorite_count", 0),
                    "retweet_count": legacy.get("retweet_count", 0),
                    "reply_count": legacy.get("reply_count", 0),
                },
            })
    return tweets


@app.get("/tweets/{handle}")
async def get_tweets(
    handle: str,
    limit: int = Query(20, ge=1, le=100),
    since_id: Optional[str] = Query(None),
):
    try:
        page = await _context.new_page()

        try:
            async with page.expect_response(
                lambda r: "UserTweets" in r.url and r.status == 200,
                timeout=25000,
            ) as response_info:
                await page.goto(
                    f"https://x.com/{handle}",
                    wait_until="domcontentloaded",
                    timeout=30000,
                )
            response = await response_info.value
            data = await response.json()
            tweets = _parse_tweets(data, handle, since_id)
        except Exception:
            tweets = []

        await page.close()

        return {"handle": handle, "count": len(tweets), "tweets": tweets[:limit]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
