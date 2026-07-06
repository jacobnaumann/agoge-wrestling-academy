# Deploys the Agoge site to the DigitalOcean droplet.
# Usage: .\deploy\deploy.ps1 [-SkipBuild] [-FrontendOnly | -BackendOnly]
param(
    [switch]$SkipBuild,
    [switch]$FrontendOnly,
    [switch]$BackendOnly
)

$ErrorActionPreference = 'Stop'
$Server = 'root@204.48.16.139'
$Root = Split-Path $PSScriptRoot -Parent

if (-not $BackendOnly) {
    if (-not $SkipBuild) {
        Write-Host '== Building frontend =='
        Push-Location "$Root\frontend"
        npm run build
        if ($LASTEXITCODE -ne 0) { Pop-Location; throw 'Frontend build failed' }
        Pop-Location
    }

    Write-Host '== Uploading frontend build =='
    ssh $Server 'rm -rf /tmp/frontend-build'
    scp -r "$Root\frontend\build" "${Server}:/tmp/frontend-build"
    # chmod is required: files scp'd from Windows land with 600/700 perms nginx can't read
    ssh $Server 'rm -rf /var/www/html/* && cp -r /tmp/frontend-build/* /var/www/html/ && find /var/www/html -type d -exec chmod 755 {} + && find /var/www/html -type f -exec chmod 644 {} + && rm -rf /tmp/frontend-build'
}

if (-not $FrontendOnly) {
    Write-Host '== Uploading backend =='
    Push-Location $Root
    tar -czf "$env:TEMP\agoge-backend.tgz" --exclude=node_modules --exclude=.env backend
    Pop-Location
    scp "$env:TEMP\agoge-backend.tgz" "${Server}:/tmp/backend.tgz"
    Remove-Item "$env:TEMP\agoge-backend.tgz"
    # .env on the server is preserved (excluded from the archive)
    ssh $Server 'tar -xzf /tmp/backend.tgz -C /root/ && rm /tmp/backend.tgz && cd /root/backend && npm ci --omit=dev --silent && pm2 restart agoge-api'
}

Write-Host '== Done =='
ssh $Server 'pm2 ls && curl -s -o /dev/null -w "site: %{http_code}\n" http://localhost/'
