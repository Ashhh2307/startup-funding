
$paths = $env:Path -split ';'
foreach ($p in $paths) {
    if (Test-Path "$p\node.exe") {
        Write-Host "Found node at: $p\node.exe"
    }
    if (Test-Path "$p\npm.cmd") {
        Write-Host "Found npm at: $p\npm.cmd"
    }
}
