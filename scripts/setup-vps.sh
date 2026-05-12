#!/usr/bin/env bash
# AWS Lightsail / Ubuntu 24.04 setup script for ai-crawling
#
# Usage on fresh VPS (run as ubuntu user with sudo):
#   curl -fsSL https://raw.githubusercontent.com/<your-user>/ai-crawling/main/scripts/setup-vps.sh | bash -s -- api.yourdomain.com your@email.com
# OR after SCP-ing the script:
#   bash setup-vps.sh api.yourdomain.com your@email.com

set -euo pipefail

API_DOMAIN="${1:?Usage: setup-vps.sh <api-domain> <email-for-certbot>}"
CERT_EMAIL="${2:?Usage: setup-vps.sh <api-domain> <email-for-certbot>}"
REPO_URL="${REPO_URL:-https://github.com/npmh0310/ai-crawling.git}"
APP_DIR="/opt/ai-crawling"
APP_USER="${SUDO_USER:-$USER}"

echo "==> [1/7] Update apt & install base packages"
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg lsb-release ufw nginx certbot python3-certbot-nginx git

echo "==> [2/7] Install Docker Engine + Compose plugin"
if ! command -v docker >/dev/null 2>&1; then
  sudo install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update -y
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi
sudo usermod -aG docker "$APP_USER" || true

echo "==> [3/7] Configure UFW firewall"
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo "==> [4/7] Clone repo to $APP_DIR"
if [ ! -d "$APP_DIR" ]; then
  sudo mkdir -p "$APP_DIR"
  sudo chown "$APP_USER:$APP_USER" "$APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
fi
sudo chown -R "$APP_USER:$APP_USER" "$APP_DIR"

echo "==> [5/7] Setup Nginx reverse proxy for $API_DOMAIN"
sudo tee /etc/nginx/sites-available/ai-crawling > /dev/null <<NGINX
server {
    listen 80;
    server_name $API_DOMAIN;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3009;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 90s;
    }
}
NGINX
sudo ln -sf /etc/nginx/sites-available/ai-crawling /etc/nginx/sites-enabled/ai-crawling
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "==> [6/7] Issue Let's Encrypt cert for $API_DOMAIN"
echo "    (make sure DNS A record $API_DOMAIN points to this server before proceeding)"
sudo certbot --nginx -d "$API_DOMAIN" --non-interactive --agree-tos -m "$CERT_EMAIL" --redirect

echo "==> [7/7] Setup complete. Next steps:"
cat <<EOF

  1. Create production env files (NOT committed to git):
       sudo -u $APP_USER nano $APP_DIR/backend/.env.production
       sudo -u $APP_USER nano $APP_DIR/twitter-service/.env.production

  2. Upload Twitter cookies file:
       scp twitter-service/cookies.json $APP_USER@<this-server>:$APP_DIR/twitter-service/cookies.json

  3. First-time build & start:
       cd $APP_DIR
       newgrp docker  # or logout/login to pick up docker group
       docker compose up -d --build
       docker compose exec backend npx prisma migrate deploy

  4. Verify:
       curl https://$API_DOMAIN/feed
       docker compose logs -f

  5. Add GitHub secrets for CI/CD:
       VPS_HOST=<this server static IP>
       VPS_USER=$APP_USER
       VPS_PORT=22
       VPS_SSH_KEY=<contents of ~/.ssh/id_ed25519 from your local machine>

EOF
