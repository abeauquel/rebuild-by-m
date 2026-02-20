#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

TAILWIND_BIN="$CLAUDE_PROJECT_DIR/tailwindcss"

# Download Tailwind CSS v4 standalone CLI if not already present
if [ ! -f "$TAILWIND_BIN" ]; then
  echo "Downloading Tailwind CSS v4 standalone CLI..."
  curl -sL https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64 \
    -o "$TAILWIND_BIN"
  chmod +x "$TAILWIND_BIN"
  echo "Tailwind CSS CLI downloaded successfully."
fi

# Build CSS
echo "Building CSS with Tailwind CSS..."
"$TAILWIND_BIN" -i "$CLAUDE_PROJECT_DIR/css/input.css" -o "$CLAUDE_PROJECT_DIR/css/output.css"
echo "CSS build complete."
