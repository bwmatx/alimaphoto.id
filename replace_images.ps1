$content = Get-Content "e:\008 BW 2026\Juni\alima website\index.html" -Raw
$newSrc = 'https://ik.imagekit.io/bwindonesiaimg/Testimoni/renggi.jpg?updatedAt=1761836259426'
$newContent = [regex]::Replace($content, '(<img[^>]*?src=")(.*?)(")', "`${1}$newSrc`${3}", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
Set-Content "e:\008 BW 2026\Juni\alima website\index.html" $newContent -Encoding UTF8
