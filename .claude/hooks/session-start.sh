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

# Export tw helper via CLAUDE_ENV_FILE for use during the session
# Usage: tw        → one-off rebuild
#        tw --watch → watch mode (rebuilds on file changes)
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export PATH=\"$CLAUDE_PROJECT_DIR:\$PATH\"" >> "$CLAUDE_ENV_FILE"
  echo "tw() { \"$TAILWIND_BIN\" -i \"$CLAUDE_PROJECT_DIR/css/input.css\" -o \"$CLAUDE_PROJECT_DIR/css/output.css\" \"\$@\"; }" >> "$CLAUDE_ENV_FILE"
fi

# Build CSS
echo "Building CSS with Tailwind CSS..."
"$TAILWIND_BIN" -i "$CLAUDE_PROJECT_DIR/css/input.css" -o "$CLAUDE_PROJECT_DIR/css/output.css"
echo "CSS build complete."
