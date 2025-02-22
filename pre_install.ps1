# Ready
Write-Host "Initializing Python Virtual Environment..."
[string] $Env_Name = "Inko_Python"
python -m venv $Env_Name
Write-Host $Env_Name "was created."
Write-Host "Installing Python Packages..."

& .\$Env_Name\Scripts\activate

python -m pip install -r "requirements.txt"
if (Test-Path -Path ".env"){
    Write-Host ".env file already exists."
}
else{
    Write-Host "Creating .env file"
    New-Item -Path ".env" -ItemType File
    # adding private variables names here.
    Add-Content -Path ".env" -Value "google_aistudio_api = 0"
}
# install npm packages from the package.json file
Set-Location .\Others\Packages
npm install
Set-Location ..\..

# Done
Write-Host "Done..."
Pause
