# DBU prototyper

Samling af klik-prototyper udviklet for DBU. Åbn `index.html` i roden for at vælge en prototype.

| Mappe | Prototype | Status |
|---|---|---|
| `marketplace/` | DBU Klubmarked (markedsplads for dansk fodbold) | Færdig klik-prototype |
| `partner360/` | DBU Partner360 (partnerplatform: partnere, aktiverings-wizard, performance) | Klik-prototype, bygget fra Figma "DBU medie bureau" (hi-fi) |

## Konventioner

- Ren vanilla HTML/CSS/JS. Ingen build, framework eller package manager.
- Hver prototype er selvstændig i sin egen mappe med egne `css/`, `js/` og assets. Alle stier er relative, så en mappe kan flyttes eller zippes for sig.
- DBU-designtokens (farver, fonte, radius) ligger i hver prototypes `css/styles.css` som CSS-variabler. Brug altid variablerne, aldrig hardkodede farver.
- Fonte (Barlow + Inter) og Lucide-ikoner hentes via CDN.
- UI er på dansk.

## Tilføj en ny prototype

1. Opret en ny mappe i roden med `index.html`, `css/styles.css` og `js/`.
2. Kopiér `:root`-tokens fra `partner360/css/styles.css` som udgangspunkt.
3. Tilføj et kort i rodens `index.html` under `.grid`.
