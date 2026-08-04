#!/usr/bin/env bash
#
# Publica el portafolio en GitHub Pages (rama gh-pages).
#
# El sitio se sirve en https://nachodiazcode.github.io/portfolio2026/, es decir
# en un subdirectorio, así que el build necesita --base-href. Además Pages es un
# servidor estático: no conoce las rutas de Angular y devuelve 404 en
# /portfolio2026/fullstack. El truco estándar es dejar un 404.html idéntico al
# index.html — Pages lo sirve y el router de Angular resuelve la ruta.
#
# Uso:  npm run deploy
#
set -euo pipefail

BASE_HREF="/portfolio2026/"
OUT="dist/portfolio/browser"

cd "$(git rev-parse --show-toplevel)"

REMOTE_URL="$(git remote get-url origin)"
SOURCE_SHA="$(git rev-parse --short HEAD)"

echo "→ Compilando con base-href ${BASE_HREF}"
npx ng build --base-href "${BASE_HREF}"

if [ ! -f "${OUT}/index.html" ]; then
  echo "✗ No se encontró ${OUT}/index.html — ¿cambió la salida del build?" >&2
  exit 1
fi

echo "→ Generando fallback de rutas (404.html) y .nojekyll"
cp "${OUT}/index.html" "${OUT}/404.html"
# Sin .nojekyll, Pages ignora los archivos que empiezan con guion bajo.
touch "${OUT}/.nojekyll"

echo "→ Publicando en gh-pages"
rm -rf "${OUT}/.git"
git -C "${OUT}" init -q
git -C "${OUT}" checkout -q -b gh-pages
git -C "${OUT}" add -A
git -C "${OUT}" -c user.name="$(git config user.name)" \
                -c user.email="$(git config user.email)" \
                commit -qm "Deploy desde ${SOURCE_SHA}"
git -C "${OUT}" push -f "${REMOTE_URL}" gh-pages:gh-pages
rm -rf "${OUT}/.git"

echo "✓ Publicado. En un par de minutos: https://nachodiazcode.github.io/portfolio2026/"
