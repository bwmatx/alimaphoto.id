const fs = require('fs');
const filePath = 'e:/008 BW 2026/Juni/alima website/index.html';
let html = fs.readFileSync(filePath, 'utf8');
const regex = /(<img[^>]+src=")[^"]+(")/gi;
html = html.replace(regex, '$1https://ik.imagekit.io/bwindonesiaimg/Testimoni/renggi.jpg?updatedAt=1761836259426$2');
fs.writeFileSync(filePath, html, 'utf8');
console.log('Done replacing images');
