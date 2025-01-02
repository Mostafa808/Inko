# Ready
Write-Host "Using Python Virtual Environment..."

.\Inko_Python\Scripts\Activate.ps1
Get-Command "python"
python -m pip freeze > requirements.txt
Pause
