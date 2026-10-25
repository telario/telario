# Icone di Telario

Telario include localmente le 2.060 varianti SVG di **Font Awesome Free 6.7.2**
(solid, regular e brands). Non richiede CDN o connessioni esterne per disegnarle.

Fonte: https://github.com/FortAwesome/Font-Awesome/tree/6.7.2

Le icone SVG sono di Fonticons, Inc., distribuite con licenza **CC BY 4.0**:
https://creativecommons.org/licenses/by/4.0/
La licenza upstream completa è in `public/licenses/fontawesome-free.txt` e viene
inclusa anche nelle informazioni sulle librerie di terze parti dell'app.
I tracciati non sono stati ridisegnati; sono stati estratti dai metadati ufficiali.
Le icone dei marchi rappresentano i rispettivi titolari e non implicano affiliazione.

## Compatibilità Balsamiq

Il renderer riconosce i suffissi `-solid`, `-regular`, `-brands`, gli alias del
catalogo e i nomi storici Font Awesome 4. Il nome esatto moderno ha precedenza
sugli alias. `circle-small-solid` viene risolto come `circle-solid`.

Se uno stile richiesto non esiste nel catalogo Free, viene utilizzato un altro
stile Free della stessa icona: per esempio `database-regular` usa `database-solid`.
Questa sostituzione riguarda solo la visualizzazione: il valore originale nel
documento non viene modificato. Per icone non risolte rimane il renderer precedente,
incluso il segnaposto `?` quando necessario.

Non sono incluse icone Pro, risorse estratte da Balsamiq o icone personalizzate
dei documenti. Non è garantita l'identità visiva con ogni versione di Balsamiq.

## Rigenerazione e verifiche

`python scripts/vendor-fontawesome.py` scarica i metadati della versione fissata,
estrae soltanto gli stili elencati come Free e copia la licenza ufficiale.
`node scripts/generate-notices.mjs` aggiorna le attribuzioni distribuite con l'app.
I test verificano ogni variante, alias storici, identificativi osservati nel file
di prova e la presenza di tracciati vettoriali autonomi nell'output del renderer.
I documenti privati non vengono inclusi nel repository.
