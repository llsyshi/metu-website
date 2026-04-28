$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

Write-Host "Starting METU website dev server..." -ForegroundColor Cyan

if (-not (Test-Path ".\node_modules")) {
  Write-Host "node_modules not found. Installing dependencies..." -ForegroundColor Yellow
  npm install
}

Write-Host "Open this URL in your browser:" -ForegroundColor Green
Write-Host "http://localhost:5173/" -ForegroundColor Green
Write-Host ""

npm run dev -- --port 5173
