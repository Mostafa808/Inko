Set-Location .\Others\Packages
npm run build
Set-Location .\..\..
#Move-Item -Path ".\Others\Scripts\*.js" -Destination ".\Inko_Site\resources\js" -Force
#Copy-Item -Path ".\Others\Packages\node_modules\*\dist\*.min.js" -Destination ".\Inko_Site\resources\js" -Force
Write-Host "TypeScript files are compiled and moved to django resources folder."
