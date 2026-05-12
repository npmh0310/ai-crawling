"""
Mở browser, login Twitter thủ công, tự động lưu cookies.
Chạy 1 lần trước khi start service.

Usage:
    python save_cookies.py
"""

import asyncio
import json
import os

from dotenv import load_dotenv
from playwright.async_api import async_playwright

load_dotenv()

COOKIES_FILE = os.getenv("TWITTER_COOKIES_FILE", "cookies.json")


async def main():
    print("Mở browser để login Twitter...")
    print("Sau khi login xong, nhấn Enter trong terminal này.\n")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        await page.goto("https://x.com/login")
        input(">> Đã login xong? Nhấn Enter để lưu cookies...")

        cookies = await context.cookies()
        with open(COOKIES_FILE, "w") as f:
            json.dump(cookies, f, indent=2)

        print(f"✓ Đã lưu {len(cookies)} cookies vào {COOKIES_FILE}")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
