@echo off
echo Building and starting Admin Panel...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo.
echo Starting server on http://localhost:5000
echo Admin panel: http://localhost:5000/admin
echo Press Ctrl+C to stop the server
call npm run server
pause
