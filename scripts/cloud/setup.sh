#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
node -e 'if (Number(process.versions.node.split(".")[0]) < 22) { console.error("Use Node.js 22 or newer"); process.exit(1); }'
npm ci --cache "${NPM_CONFIG_CACHE:-/tmp/ebaq-npm-cache}"
printf '\nReady. Run npm run dev -- --host 0.0.0.0\n'
