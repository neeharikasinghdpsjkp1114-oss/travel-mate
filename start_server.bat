@echo off
title TravelMate Server
echo Starting TravelMate Backend Server on http://localhost:5000 ...

REM Check default python in PATH, or use LocalAppData installed python
where python >nul 2>nul
if %errorlevel% equ 0 (
    python server.py
) else if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" server.py
) else (
    echo Python not found. Please install Python to run the backend.
    pause
)
