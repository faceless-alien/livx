#!/bin/sh
set -e

echo "Running Payload migrations..."
npx payload migrate --config src/payload/payload.config.ts

echo "Starting server..."
exec "$@"
