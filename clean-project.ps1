# Clean project script to resolve source map warnings

Write-Host "Stopping any running processes..." -ForegroundColor Yellow
# You may need to manually stop any running processes first

Write-Host "Removing .next folder..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host "Removing node_modules folder..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Project cleaned and dependencies reinstalled." -ForegroundColor Green
Write-Host "You can now run 'npm run dev' to start the development server." -ForegroundColor Green