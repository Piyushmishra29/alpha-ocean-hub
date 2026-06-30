#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────────────────
# Alpha Ocean Hub — Static site deployment via FTP
# ──────────────────────────────────────────────────────────
# Prerequisites:
#   1. Install lftp (macOS: brew install lftp)
#   2. Create .env.ftp with:
#        FTP_HOST=your-host.com
#        FTP_USER=your-username
#        FTP_PASS=your-password
#        FTP_REMOTE_DIR=/public_html   # or wherever the site root is
#   3. chmod +x scripts/deploy.sh
#
# Usage:
#   npm run build        # builds to out/
#   ./scripts/deploy.sh  # uploads to server
#
# For a one-shot without lftp, use the python server approach:
#   rsync -avz out/ user@host:/path/to/site/
# ──────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_DIR/out"
ENV_FILE="$PROJECT_DIR/.env.ftp"

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory not found at $BUILD_DIR"
  echo "   Run 'npm run build' first."
  exit 1
fi

# ── Load FTP credentials ────────────────────────────────
if [ -f "$ENV_FILE" ]; then
  source "$ENV_FILE"
else
  echo "⚠️  No .env.ftp file found."
  echo "   Usage: FTP_HOST=... FTP_USER=... FTP_PASS=... $0"
  exit 1
fi

: "${FTP_HOST:?FTP_HOST not set}"
: "${FTP_USER:?FTP_USER not set}"
: "${FTP_PASS:?FTP_PASS not set}"
: "${FTP_REMOTE_DIR:=/public_html}"

# ── Build the site ──────────────────────────────────────
echo "🏗️  Building site..."
npm run build

# ── Deploy via lftp ─────────────────────────────────────
if command -v lftp &> /dev/null; then
  echo "📤 Deploying to $FTP_HOST:$FTP_REMOTE_DIR via FTP..."

  lftp -c "
    set ftp:ssl-allow no
    set net:max-retries 3
    set net:timeout 30
    open -u \"$FTP_USER\",\"$FTP_PASS\" \"$FTP_HOST\"
    mirror -R --verbose=1 --delete --parallel=4 \
      \"$BUILD_DIR\" \"$FTP_REMOTE_DIR\"
    quit
  "

  echo "✅ Deployment complete!"
else
  echo "⚠️  lftp not found. Install it: brew install lftp"
  echo "   Alternatively, use rsync:"
  echo "   rsync -avz --delete \"$BUILD_DIR/\" user@$FTP_HOST:$FTP_REMOTE_DIR/"
  exit 1
fi
