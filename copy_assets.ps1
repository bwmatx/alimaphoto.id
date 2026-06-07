New-Item -ItemType Directory -Force -Path "assets\images"
New-Item -ItemType Directory -Force -Path "assets\css"
New-Item -ItemType Directory -Force -Path "assets\js"

Copy-Item -Path "C:\Users\bw Indonesia!\.gemini\antigravity-ide\brain\723110b2-74dc-49b0-937d-199ad24c15c0\hero_photography_studio_1780860540234.png" -Destination "assets\images\hero.png" -Force
Copy-Item -Path "C:\Users\bw Indonesia!\.gemini\antigravity-ide\brain\723110b2-74dc-49b0-937d-199ad24c15c0\portfolio_craftsmanship_1780860551923.png" -Destination "assets\images\portfolio1.png" -Force
Copy-Item -Path "C:\Users\bw Indonesia!\.gemini\antigravity-ide\brain\723110b2-74dc-49b0-937d-199ad24c15c0\portfolio_architecture_1780860563557.png" -Destination "assets\images\portfolio2.png" -Force
