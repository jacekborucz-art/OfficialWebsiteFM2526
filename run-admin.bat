@echo off
REM FM26 Admin Panel - Server Starter
REM This batch file runs the server with PM2

title FM26 Admin Panel Server

cd /d "c:\Users\Jack Cave\Documents\FM google studio\FM26PL\OfficialWebsiteFM2526"

echo.
echo ================================
echo FM26 Admin Panel - Server Start
echo ================================
echo.

REM Czekaj 3 sekundy na inicjalizacje
timeout /t 3 /nobreak

REM Sprawdz czy PM2 jest zainstalowany
pm2 --version >nul 2>&1
if errorlevel 1 (
    echo Zainstaluj PM2: npm install -g pm2
    pause
    exit /b 1
)

REM Przywroc zapisane procesy PM2
echo Uruchamianie serwera...
pm2 resurrect

REM Pokaż liste procesów
echo.
echo Procesy PM2:
pm2 list

echo.
echo ================================
echo Serwer uruchomiony!
echo Dostep: http://localhost:5000/admin
echo ================================
echo.
echo Aby zatrzymac serwer: pm2 stop fm26-admin
echo Aby zobaczyc logi: pm2 logs fm26-admin
echo.
