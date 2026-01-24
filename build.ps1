Write-Host "🌌 Building Pillars of Creation Maps..." -ForegroundColor Cyan
Write-Host ""

# Create data directory
New-Item -ItemType Directory -Force -Path data | Out-Null

# Download original files
Write-Host "📥 Downloading GeoJSON data..." -ForegroundColor Yellow
Write-Host "   → Countries (this may take a minute)..." -ForegroundColor Gray
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson" -OutFile "data/countries-full.geojson"

Write-Host "   → Regions (this may take a minute)..." -ForegroundColor Gray
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson" -OutFile "data/regions-full.geojson"

# Simplify (requires mapshaper)
Write-Host ""
Write-Host "✂️  Simplifying geometries (5% tolerance)..." -ForegroundColor Yellow
Write-Host "   → Processing countries..." -ForegroundColor Gray
npx mapshaper data/countries-full.geojson -simplify 5% -o data/countries.geojson

Write-Host "   → Processing regions..." -ForegroundColor Gray
npx mapshaper data/regions-full.geojson -simplify 5% -o data/regions.geojson

# Compress with gzip (Windows)
Write-Host ""
Write-Host "🗜️  Compressing with gzip..." -ForegroundColor Yellow

# Create gzip function for Windows
function Compress-GZip {
    param($Source, $Destination)
    $sourceStream = [System.IO.File]::OpenRead($Source)
    $destStream = [System.IO.File]::Create($Destination)
    $gzipStream = New-Object System.IO.Compression.GZipStream($destStream, [System.IO.Compression.CompressionMode]::Compress)
    
    $sourceStream.CopyTo($gzipStream)
    
    $gzipStream.Close()
    $destStream.Close()
    $sourceStream.Close()
}

Compress-GZip "data/countries.geojson" "data/countries.geojson.gz"
Compress-GZip "data/regions.geojson" "data/regions.geojson.gz"

Write-Host ""
Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 File sizes:" -ForegroundColor Cyan

$countriesSize = (Get-Item "data/countries.geojson").Length / 1MB
$regionsSize = (Get-Item "data/regions.geojson").Length / 1MB
$countriesGzSize = (Get-Item "data/countries.geojson.gz").Length / 1MB
$regionsGzSize = (Get-Item "data/regions.geojson.gz").Length / 1MB

Write-Host ("   countries.geojson:    {0:N2} MB" -f $countriesSize)
Write-Host ("   regions.geojson:      {0:N2} MB" -f $regionsSize)
Write-Host ("   countries.geojson.gz: {0:N2} MB" -f $countriesGzSize)
Write-Host ("   regions.geojson.gz:   {0:N2} MB" -f $regionsGzSize)
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Commit the data/ folder to your repo"
Write-Host "   2. Push to GitHub"
Write-Host "   3. Enable GitHub Pages in repo settings"
Write-Host ""
Write-Host "🌌 Ready to create epic map animations!" -ForegroundColor Magenta