@echo off
rem Starts the Cave Slam dev server and opens the game in your browser.
cd /d "%~dp0"
start "" /b cmd /c "timeout /t 2 /nobreak >/dev/null & start "" http://localhost:8080/software/"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
