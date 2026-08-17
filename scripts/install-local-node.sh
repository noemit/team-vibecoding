#!/usr/bin/env bash
# Installs a standalone Node.js runtime in .node/ if node/npm are missing.
# Source .node/env.sh afterwards to use it. Safe to re-run.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_DIR="$ROOT/.node"
NODE_VERSION="v22.23.1"

if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
  echo "Node and npm are already available: $(node -v) / $(npm -v)"
  exit 0
fi

mkdir -p "$NODE_DIR"

if [ ! -x "$NODE_DIR/bin/node" ]; then
  ARCH="$(uname -m)"
  case "$ARCH" in
    x86_64) DARCH="x64" ;;
    aarch64|arm64) DARCH="arm64" ;;
    *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
  esac

  TARBALL="node-$NODE_VERSION-linux-$DARCH.tar.xz"
  URL="https://nodejs.org/dist/$NODE_VERSION/$TARBALL"

  echo "Downloading $URL ..."
  curl -fsSL -o "$NODE_DIR/$TARBALL" "$URL" || wget -q -O "$NODE_DIR/$TARBALL" "$URL"
  tar -xJf "$NODE_DIR/$TARBALL" -C "$NODE_DIR" --strip-components=1
  rm -f "$NODE_DIR/$TARBALL"
fi

cat > "$NODE_DIR/env.sh" <<EOF
export PATH="$NODE_DIR/bin:\$PATH"
EOF

echo "Local Node installed at $NODE_DIR"
echo "Run: source $NODE_DIR/env.sh"
