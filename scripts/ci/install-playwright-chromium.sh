#!/usr/bin/env bash
# Resilient Playwright Chromium install for GitHub Actions.
# `--with-deps` apt fetches flake on DNS; download browser first, then retry deps.
set -euo pipefail

echo "Installing Playwright Chromium browser..."
npx playwright install chromium

echo "Installing system dependencies (retrying on apt/DNS flake)..."
deps_ok=0
for attempt in 1 2 3; do
  if npx playwright install-deps chromium; then
    deps_ok=1
    break
  fi
  echo "install-deps attempt ${attempt} failed; sleeping before retry..."
  sleep $((attempt * 15))
done

if [[ "${deps_ok}" -ne 1 ]]; then
  echo "::warning::playwright install-deps failed after retries; continuing with browser-only install (ubuntu-latest usually has required libs)"
fi

echo "Playwright Chromium ready:"
node -e "import('playwright').then((p) => console.log(p.chromium.executablePath()))"
