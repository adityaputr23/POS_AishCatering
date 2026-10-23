@echo off
title Aish Catering - Sistem Kasir
cd /d "%~dp0"

echo ====================================================
echo        MEMBUKA APLIKASI AISH CATERING POS
echo ====================================================
echo.

if exist "dist\Aish Catering POS-win32-x64\Aish Catering POS.exe" (
    echo Menjalankan aplikasi dari file executable (.exe)...
    start "" "dist\Aish Catering POS-win32-x64\Aish Catering POS.exe"
    exit
) else (
    echo File EXE belum di-build, menjalankan mode desktop langsung...
    npx electron .
)
