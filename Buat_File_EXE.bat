@echo off
title Build EXE - Aish Catering POS
cd /d "%~dp0"

echo ====================================================
echo        PROSES MEMBUAT FILE EXE AISH CATERING
echo ====================================================
echo.
echo Sedang membungkus aplikasi menjadi file .exe mandiri...
echo Mohon tunggu sebentar sampai selesai...
echo.

call npm run build:exe

echo.
echo ====================================================
echo SELESAI!
echo File aplikasi .exe ada di folder:
echo dist\Aish Catering POS-win32-x64\Aish Catering POS.exe
echo ====================================================
echo.
pause
