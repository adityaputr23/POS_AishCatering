@echo off
title Aish Catering POS - Update Otomatis
color 0A
cls
echo ===================================================
echo     AISH CATERING - SISTEM POS UPDATE OTOMATIS
echo ===================================================
echo.
echo [1/3] Menutup aplikasi kasir yang sedang berjalan...
taskkill /F /IM "Aish Catering POS.exe" >nul 2>&1
timeout /t 1 /nobreak >nul

echo [2/3] Memperbarui dan mem-package versi terbaru...
call npm run build:exe
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo [GAGAL] Terjadi kesalahan saat mem-build aplikasi!
    echo Pastikan Anda memiliki koneksi internet atau hak akses folder.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Pembaruan Berhasil! Menjalankan aplikasi versi terbaru...
start "" "dist\Aish Catering POS-win32-x64\Aish Catering POS.exe"

echo.
echo ===================================================
echo   Aplikasi Aish Catering POS berhasil diperbarui!
echo ===================================================
timeout /t 2 /nobreak >nul
exit
