# Telario Desktop — evolutiva Electron

**Stato: proposta archiviata, non implementata.**

Registrata il 25 ottobre 2026 su richiesta del proprietario. Questo documento serve a riprendere il lavoro in futuro. Non autorizza ad avviare ora lo sviluppo e non descrive un prodotto desktop già disponibile.

## Obiettivo

Distribuire Telario come applicazione desktop installabile, utilizzabile localmente senza Docker, Node, terminale, server di sviluppo o disponibilità della demo pubblica. Il programma deve includere il motore web attuale e funzionare anche senza rete dopo l'installazione, aprendo i file `.bmpr` dal computer dell'utente.

Oggi sono disponibili l'app web pubblica, l'avvio locale con Docker e l'ambiente di sviluppo Vite. **Non esistono ancora pacchetto Electron, installer, associazioni di file o aggiornamenti desktop.** L'uso locale è già possibile con Docker: Electron dovrà semplificare la distribuzione, non essere presentato come requisito per lavorare localmente.

## Principi da conservare

- Elaborazione dei documenti sulla macchina dell'utente; nessun upload o login richiesto.
- Una sola base di codice per lettura, modello, rendering, editor ed esportazioni.
- Originali conservati; scrittura su copia e nessuna sovrascrittura implicita.
- Il salvataggio `.bmpr` resta sperimentale finché non siano completate le verifiche applicative: il packaging non aumenta automaticamente la compatibilità.
- Dati e controlli sconosciuti preservati secondo il comportamento del writer attuale.
- Nessuna modifica alle funzioni web durante questa fase di archiviazione.

## Perimetro proposto per la prima versione

1. Finestra desktop che carica una build locale inclusa nel pacchetto, non il dominio online.
2. Demo sintetica e apertura di progetti dal selettore file; trascinamento da verificare.
3. Modifiche e cronologia già disponibili nell'editor.
4. Esportazioni SVG, PNG, Markdown, JSON, Mermaid e draw.io su destinazione scelta dall'utente.
5. Salvataggio di una copia `.bmpr`, mantenendo consenso esplicito e stato sperimentale.
6. Avviso alla chiusura quando ci sono modifiche non esportate, con possibilità di annullare la chiusura.
7. Logo, icona, nome applicazione e informazioni sulla versione coerenti con il branding Telario.
8. Pacchetto verificato su una macchina che non abbia Node o Docker installati.

**Windows è la piattaforma iniziale proposta**, coerente con l'ambiente attuale. Confermare priorità e architetture quando si riprende il lavoro; non promettere ora supporto macOS/Linux o installer per piattaforme non verificate.

## Architettura da valutare alla ripresa

### Renderer condiviso

Riutilizzare React, TypeScript, SVG, rough.js e sql.js. La lettura del progetto e la logica dell'editor devono restare nei moduli esistenti. Un piccolo adattatore di ambiente potrà distinguere download browser e dialoghi desktop senza duplicare il writer o i formati di export.

Verificare il caricamento degli asset prodotti da Vite, del modulo `sql-wasm.wasm`, del catalogo icone e delle risorse raster nella build confezionata. Valutare asset relativi o un protocollo locale registrato con un gestore ristretto: il percorso definitivo va scelto con una prova tecnica, senza disattivare le protezioni del browser per far funzionare i file locali.

### Processo principale e bridge

Il processo principale gestirà ciclo di vita, finestre e dialoghi nativi. Un eventuale preload dovrà esporre soltanto operazioni nominate e limitate per apertura e salvataggio, con validazione dei messaggi IPC. Il renderer non deve ricevere accesso generico a filesystem, shell o processi.

La [documentazione del modello a processi Electron](https://www.electronjs.org/docs/latest/tutorial/process-model) distingue le responsabilità di main e renderer. Alla ripresa, confrontare il progetto con la versione Electron supportata scelta in quel momento.

### Sicurezza

Prevedere `contextIsolation`, sandbox del renderer e Node integration disabilitata nell'interfaccia. Limitare navigazioni e creazione di finestre; aprire eventuali link esterni nel browser di sistema solo dopo aver validato lo schema. Non caricare codice remoto come interfaccia dell'app desktop.

I documenti sono input non fidati: non eseguire SVG, script o indirizzi esterni contenuti nell'archivio. Le scelte devono seguire la [checklist di sicurezza ufficiale Electron](https://www.electronjs.org/docs/latest/tutorial/security), da rileggere quando inizia l'implementazione.

### Packaging

Valutare Electron Forge come primo candidato, seguendo la [guida ufficiale alla distribuzione](https://www.electronjs.org/docs/latest/tutorial/application-distribution). La scelta del tool, del formato installer e dell'eventuale pacchetto portabile è ancora aperta. Non installare dipendenze Electron o strumenti di packaging finché questa evolutiva resta in backlog.

## Sequenza proposta

### E1 — Prova tecnica isolata

- Creare un branch dedicato dal progetto aggiornato.
- Eseguire build web e test esistenti come riferimento.
- Caricare una build inclusa nel pacchetto in una finestra Electron.
- Verificare avvio completamente offline, inizializzazione WebAssembly, demo e rendering.
- Scegliere il metodo di caricamento degli asset e documentare la decisione.

### E2 — Integrazione documenti e ciclo di vita

- Definire l'adattatore I/O e il contratto del preload.
- Aggiungere dialoghi per apertura ed esportazione senza cambiare il modello dei documenti.
- Provare annullamento dei dialoghi, percorsi con spazi e caratteri Unicode, file non validi e limiti dimensionali.
- Gestire modifiche non salvate alla chiusura, caricamento di un nuovo progetto e uscita dell'app.
- Conservare consenso al salvataggio sperimentale e download/copia senza sovrascrittura implicita.

### E3 — Packaging e verifica

- Generare il pacchetto sulla piattaforma iniziale.
- Provarlo su installazione pulita senza Node, Docker o dipendenze di sviluppo.
- Verificare avvio dopo installazione, riapertura dell'app e disinstallazione.
- Includere licenze delle dipendenze e attribuzioni delle icone.
- Decidere firma del pacchetto e canale di distribuzione prima di proporlo al pubblico.
- Aggiornare sito e portfolio soltanto dopo aver pubblicato un artefatto provato.

## Criteri di accettazione

- [ ] Non è necessario che `telario.antoniotrento.net` sia raggiungibile.
- [ ] La demo e un archivio sintetico si aprono senza connessione di rete.
- [ ] WebAssembly e icone vengono caricati da risorse incluse nel pacchetto.
- [ ] Apertura, editing, geometria e undo/redo mantengono il comportamento web.
- [ ] Ogni formato di esportazione produce un file apribile e coerente.
- [ ] Un salvataggio senza modifiche conserva i byte originali.
- [ ] Le copie modificate conservano risorse e campi non interessati e passano i controlli del writer.
- [ ] Gli errori di formato non sostituiscono silenziosamente il progetto aperto.
- [ ] Annullare apertura o salvataggio non altera documenti o stato inattesi.
- [ ] L'utente può annullare una chiusura con modifiche non conservate.
- [ ] Nessuna richiesta di rete contiene il documento o ne è necessaria per elaborarlo.
- [ ] Il renderer non può eseguire comandi arbitrari o leggere percorsi generici attraverso IPC.
- [ ] I test web esistenti restano verdi; i test desktop coprono il bridge e il ciclo di vita aggiunti.
- [ ] Il pacchetto è verificato su macchina pulita e la documentazione distingue i limiti ancora presenti.

## Fuori dal primo perimetro

Sincronizzazione cloud, account, collaborazione, autosalvataggio persistente, aggiornamenti automatici, associazione `.bmpr` nel sistema e apertura con doppio clic, più finestre e nuove funzioni di editing. Valutare queste estensioni separatamente: non sono necessarie a confezionare un editor locale autonomo e non devono diventare requisiti impliciti.

## Decisioni da riprendere

Piattaforme e architetture prioritarie; installer o pacchetto portabile; accesso ai file tramite selezione browser o dialoghi nativi; politica delle copie; comportamento in chiusura; firma; canale release; aggiornamenti; licenza generale del progetto prima della distribuzione binaria. Le licenze delle dipendenze non assegnano da sole una licenza all'applicazione.

## Punto di ripartenza

Leggere questo documento, il README e `VALIDAZIONE.md`; controllare i moduli `src/io`, `src/export`, `src/ui` e la configurazione Vite; aggiornare la conoscenza della versione Electron prescelta; concordare il perimetro E1. **Nessuna implementazione Electron è compresa nel lavoro del 25 ottobre 2026.**
