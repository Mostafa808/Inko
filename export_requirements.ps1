# Ready
Write-Host "Using Python Virtual Environment..."

.\Inko_Python\Scripts\activate
Get-Command "python"
python -m pip freeze > requirements.txt
Pause
