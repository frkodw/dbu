# DBU Partner360 – klikbar HTML-prototype

Dato: 1. oktober 2026. Kilde: Figma "DBU medie bureau", section "hi-fi" (node 3689:2226).

## Mål
Omsætte de 16 hi-fi-skærme til en klikbar prototype i `partner360/`, der følger
Figma 1:1 ved 1440px og kan klikkes igennem for både Salling Group- og Skoda-flowet.

## Beslutninger (afklaret med Fredrik)
- Ét sæt sider, data-drevet. Partner vælges i Partneroverblik; `?p=salling|skoda`.
- Let state: wizard-valg gemmes i sessionStorage pr. partner og vises i Opsummering.
  Tabelfiltre og søgning virker. Ingen validering.
- Topbar: Partnere aktiv, Rapporter → performance.html, Aktiveringer/Kanaler døde.
- Desktop + let responsiv (Opsummering stables < 1200px, sidebar klapper < 1024px).

## Flow-forskelle
Skoda-flowet er en **event-aktivering** og har derfor andre valgmuligheder:
- Trin 4: "Events" (datofelter, DBU-begivenheder, listekalender med stævne-afkrydsning)
  i stedet for "Periode" (kalendergrid + begivenhedsliste). Styres af aktiveringstypen.
- Trin 5: ét materialekort (kampagnebillede) i stedet for tre (wallet, push, Marketplace).
  Kort renderes pr. valgt kanal.
- Trin 1-3, 6, 7: samme layout, andet indhold fra data.js.

## Sider
| Fil | Figma |
|---|---|
| index.html | HF 1 Partneroverblik |
| partner.html | HF 2 Partner home |
| aktivering-1.html … aktivering-7.html | HF 3–9 wizard |
| performance.html | HF 10 Aktivering performance |

Andre partnere end Salling/Skoda åbner partner.html med Salling-data, eget navn/logo.

## Kode
- `css/styles.css`: tokens (findes), topbar (2 varianter), sidebar, stepper, kort,
  tabel, chips, radio-kort, checkbokse, kalender, stat-kort, knapper, inputs.
- `js/data.js`: partnere, aktiveringer, kanaler, segmenter, begivenheder, wizard-defaults.
- `js/app.js`: partner-opløsning, topbar/sidebar/stepper-render, tabelfilter.
- `js/wizard.js`: state i sessionStorage (`p360.wizard.<partner>`), forudfyldt med
  Figma-værdier, live Opsummering, Nulstil.
- Assets eksporteres fra Figma (logoer, mockups, kort). Diagrammer i CSS/SVG.

## Verifikation
Headless Brave-screenshot (1440px) pr. side holdt op mod Figma-screenshot.
Node-script tjekker at alle interne links og billeder findes.
