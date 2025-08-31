#!/bin/bash

# Script to build and prepare the project for Vercel deployment

# Install dependencies
npm install

# Build the project
npm run build

# Copy .env.production to .env if it exists
if [ -f .env.production ]; then
  cp .env.production .env
  echo "Copied .env.production to .env"
fi

echo "Build completed successfully. Ready for Vercel deployment."