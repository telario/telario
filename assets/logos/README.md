# Telario — identità e formati

Logo definitivo scelto: **Wireframe**, la seconda proposta. Colori: petrolio **#173D4D** e arancio **#F47847**. Nome: **Telario**.

Aprire `index.html` per vedere le varianti, `preview.png` per l'anteprima e `catalogo.pdf` per il catalogo. Il pacchetto completo è `../telario-logo-kit.zip`. Tutte e quattro le [proposte originali](../proposte/index.html) sono disponibili con i relativi file in `../proposte/`.

## File disponibili

Tutti i file dell'identità corrente sono nella cartella `telario/`.

| Formato | Dimensioni e varianti |
| --- | --- |
| SVG | 10 master vettoriali: simbolo e firma × trasparente, bianco, scuro, nero, bianco monocromatico |
| PNG simbolo | 16, 32, 48, 64, 128, 180, 192, 256, 512, 1024 px |
| PNG firma | Larghezze 320, 640, 1280, 2560 px; rapporto 420:128 |
| WebP | 10 esportazioni lossless, alpha dove previsto |
| JPG | Simbolo e firma su fondo bianco e scuro |
| ICO e icone | Favicon 16–256 px, Apple 180 px, Android 192/512 px, manifest |
| PDF | 10 file vettoriali: simbolo 50 mm, firma 150 mm |
| TIFF | Simbolo e firma con alpha a 300 dpi, circa 50 e 150 mm |

La trasparenza è reale; la scacchiera appartiene soltanto alla galleria. Le varianti `mono-white` sono destinate a fondi scuri. Usare il simbolo per favicon e avatar, la firma da almeno 160 px di larghezza. Non deformare le proporzioni e mantenere i margini già presenti.

PDF e TIFF sono RGB. La conversione CMYK/PDF-X dipende da carta e macchina tipografica e va concordata con lo stampatore. Gli SVG e i PDF sono vettoriali, senza font da installare: la firma è convertita in contorni da Arial Bold; nessun file font è distribuito. SVG e PDF sono i master interoperabili, senza un formato AI proprietario.

## Rigenerazione

1. `python scripts/generate-brand.py` — fontTools e Arial Bold; percorso alternativo tramite `BMPR_BRAND_FONT`.
2. `node scripts/export-brand.mjs` — dipendenze npm e Chromium Playwright, oppure `BMPR_TEST_BROWSER`.
3. `python scripts/package-brand.py` — Pillow; verifica alpha e misure, produce formati aggiuntivi, aggiorna `public/brand/` e crea lo ZIP.

Gli script operano localmente e non usano dati dei mockup. Il simbolo è applicato all'intestazione dell'app, alle favicon e alle icone web.
