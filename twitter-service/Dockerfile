FROM mcr.microsoft.com/playwright/python:v1.52.0-jammy

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=3010 \
    HEADLESS=true \
    TWITTER_COOKIES_FILE=/app/cookies.json

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py save_cookies.py ./

EXPOSE 3010
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
