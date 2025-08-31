# Script to build and prepare the project for Vercel deployment

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Build the project
Write-Host "Building the project..."
npm run build

# Copy .env.production to .env if it exists
if (Test-Path .env.production) {
  Copy-Item .env.production .env -Force
  Write-Host "Copied .env.production to .env"
}

Write-Host "Build completed successfully. Ready for Vercel deployment." -ForegroundColor Green