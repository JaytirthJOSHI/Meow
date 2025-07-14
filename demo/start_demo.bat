@echo off
echo 🐾 MeowLang Demo Startup
echo ========================================

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.7+
    pause
    exit /b 1
)

REM Install dependencies
echo 🔄 Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete!
echo.
echo Choose an option:
echo 1. Start backend server (for API)
echo 2. Start frontend server (for web interface)
echo 3. Start both (requires two command windows)
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo 🚀 Starting backend server...
    echo Backend will be available at: http://localhost:5000
    python app.py
) else if "%choice%"=="2" (
    echo 🌐 Starting frontend server...
    echo Frontend will be available at: http://localhost:8000
    python -m http.server 8000
) else if "%choice%"=="3" (
    echo 🔄 Starting both servers...
    echo Backend: http://localhost:5000
    echo Frontend: http://localhost:8000
    echo.
    echo Starting backend in background...
    start "MeowLang Backend" python app.py
    timeout /t 3 /nobreak >nul
    echo Starting frontend...
    python -m http.server 8000
) else (
    echo ❌ Invalid choice
)

pause 