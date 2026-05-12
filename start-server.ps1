# FM26 Admin Panel - Auto Start Server Script
# Ten skrypt uruchamia serwer Admin Panel za pomocą PM2

Write-Host "Starting FM26 Admin Panel Server..." -ForegroundColor Green

# Przejdz do folderu projektu
Set-Location -Path "c:\Users\Jack Cave\Documents\FM google studio\FM26PL\OfficialWebsiteFM2526"

# Czekaj 5 sekund na inicjalizacje systemu
Start-Sleep -Seconds 5

# Uruchom PM2 daemon z zapisanymi procesami
pm2 resurrect

# Sprawdz status
pm2 list

Write-Host "FM26 Admin Panel Server started successfully!" -ForegroundColor Green
Write-Host "Access at: http://localhost:5000/admin" -ForegroundColor Cyan
