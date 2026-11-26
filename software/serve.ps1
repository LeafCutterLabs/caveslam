# Cave Slam dev server for Windows (no install needed).
# Serves the project folder (the one holding assets\ and software\) on
# http://localhost:8080/ and lists every file under assets\ at /__assets.json,
# so the game picks up new art on each page reload.
param([int]$Port = 8080)

$Root = Split-Path -Parent $PSScriptRoot
$Assets = Join-Path $Root 'assets'
$Types = @{
  '.html'='text/html; charset=utf-8'; '.js'='text/javascript'; '.json'='application/json';
  '.png'='image/png'; '.webp'='image/webp'; '.jpg'='image/jpeg'; '.css'='text/css';
  '.ogg'='audio/ogg'; '.mp3'='audio/mpeg'; '.md'='text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try { $listener.Start() } catch {
  Write-Host "Could not start on port $Port. Is the game already running? Try: serve.ps1 -Port 8081" -ForegroundColor Red
  exit 1
}
Write-Host "Cave Slam running at http://localhost:$Port/software/  (close this window to stop)" -ForegroundColor Yellow

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request; $res = $ctx.Response
  try {
    $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
    $res.Headers.Add('Cache-Control', 'no-store')
    if ($path -eq '/__assets.json') {
      $files = @()
      if (Test-Path $Assets) {
        $files = Get-ChildItem -Path $Assets -Recurse -File | ForEach-Object {
          $_.FullName.Substring($Assets.Length + 1).Replace('\', '/')
        }
      }
      $json = ConvertTo-Json -InputObject @($files) -Compress
      $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
      $res.ContentType = 'application/json'
    } else {
      if ($path.EndsWith('/')) { $path += 'index.html' }
      $file = [System.IO.Path]::GetFullPath((Join-Path $Root $path.TrimStart('/')))
      if (-not $file.StartsWith($Root) -or -not (Test-Path $file -PathType Leaf)) {
        $res.StatusCode = 404; $bytes = [System.Text.Encoding]::UTF8.GetBytes('not found')
      } else {
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $res.ContentType = if ($Types.ContainsKey($ext)) { $Types[$ext] } else { 'application/octet-stream' }
        $bytes = [System.IO.File]::ReadAllBytes($file)
      }
    }
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    $res.StatusCode = 500
  } finally {
    $res.OutputStream.Close()
  }
}
