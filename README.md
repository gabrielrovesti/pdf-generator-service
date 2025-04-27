# PDF Generator Service

Un servizio di generazione PDF con supporto nativo per ChartJS, sviluppato come Proof of Concept per Kalaway.

## Descrizione

Questo servizio offre un'alternativa all'attuale architettura basata su Puppeteer, fornendo una soluzione più efficiente e scalabile per la generazione di report PDF con grafici. Utilizza tecnologie moderne come Express, Chart.js, e PDFKit per creare documenti PDF di alta qualità direttamente dal server, eliminando la necessità di un browser headless.

## Caratteristiche principali

- Generazione di PDF in formato verticale (portrait) e orizzontale (landscape)
- Rendering nativo di grafici ChartJS (bar, line, pie, ecc.)
- Ottimizzazione delle immagini per migliorare le prestazioni
- API RESTful per integrazione con frontend esistenti
- Interfaccia di test HTML inclusa

## Prerequisiti

- Node.js (versione 18.x o superiore)
- npm (versione 8.x o superiore)

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/tuoUsername/pdf-generator-service.git
   cd pdf-generator-service
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Compila il progetto TypeScript:
   ```bash
   npm run build
   ```

## Utilizzo

### Avvio del server

Per avviare il server in modalità sviluppo con ricaricamento automatico:
```bash
npm run dev
```

Per avviare il server in modalità produzione:
```bash
npm start
```

Il server sarà in ascolto sulla porta 3000 (o sulla porta specificata tramite la variabile d'ambiente PORT).

### Test del servizio

#### Utilizzo dell'interfaccia HTML

1. Apri il file `test-client.html` nel tuo browser
2. Usa i pulsanti "Genera PDF (Verticale)" o "Genera PDF (Orizzontale)" per testare il servizio

#### Utilizzo delle API

##### Generazione PDF verticale (portrait)

```powershell
# Con PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/pdf/generate" -Method Post -Headers @{"Content-Type"="application/json"} -Body (Get-Content -Raw -Path "test-data.json") -OutFile "report.pdf"
```

```bash
# Con curl
curl -X POST -H "Content-Type: application/json" -d @test-data.json http://localhost:3000/api/pdf/generate --output report.pdf
```

##### Generazione PDF orizzontale (landscape)

```powershell
# Con PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/pdf/generate-landscape" -Method Post -Headers @{"Content-Type"="application/json"} -Body (Get-Content -Raw -Path "test-data.json") -OutFile "report_landscape.pdf"
```

```bash
# Con curl
curl -X POST -H "Content-Type: application/json" -d @test-data.json http://localhost:3000/api/pdf/generate-landscape --output report_landscape.pdf
```

### Formato dei dati

I report devono essere forniti in formato JSON con la seguente struttura:

```json
{
  "title": "Titolo del Report",
  "author": "Nome Autore",
  "charts": [
    {
      "type": "bar",
      "title": "Titolo Grafico",
      "labels": ["Etichetta1", "Etichetta2", "..."],
      "datasets": [
        {
          "label": "Serie1",
          "data": [valore1, valore2, ...],
          "backgroundColor": "rgba(54, 162, 235, 0.5)",
          "borderColor": "rgb(54, 162, 235)",
          "borderWidth": 1
        }
      ]
    }
  ]
}
```

## Struttura del progetto

```
pdf-generator-service/
├── src/                    # Codice sorgente
│   ├── controllers/        # Controller Express
│   │   └── pdfController.ts
│   ├── models/             # Definizioni dei tipi di dati
│   │   └── reportModel.ts
│   ├── routes/             # Definizioni delle rotte API
│   │   └── pdfRoutes.ts
│   ├── services/           # Servizi di business logic
│   │   ├── chartService.ts
│   │   └── pdfService.ts
│   ├── utils/              # Utility 
│   │   └── imageUtils.ts
│   └── app.ts              # Entry point dell'applicazione
├── dist/                   # Codice compilato (generato)
├── test-client.html        # Client di test
├── test-data.json          # Dati di esempio
├── tsconfig.json           # Configurazione TypeScript
└── package.json            # Dipendenze e script
```

## Risoluzione dei problemi

### Errore: Cannot find module 'chart.js'

Assicurati di aver installato tutte le dipendenze:
```bash
npm install
```

### Errore: Address already in use

La porta 3000 è già in uso. Modifica la porta nel file `src/app.ts` o usa la variabile d'ambiente PORT.

### Errore: Cannot find ChartJS module

Se riscontri problemi con Chart.js, assicurati di utilizzare le versioni corrette delle dipendenze nel `package.json`.