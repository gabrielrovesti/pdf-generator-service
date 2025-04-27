"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLandscapeReport = exports.generateReport = void 0;
// Servizio principale per la generazione dei PDF
const pdfkit_1 = __importDefault(require("pdfkit"));
const chartService_1 = require("./chartService");
const imageUtils_1 = require("../utils/imageUtils");
const generateReport = async (reportData) => {
    console.log('Generazione report PDF in formato verticale');
    return await createPDF(reportData, false);
};
exports.generateReport = generateReport;
const generateLandscapeReport = async (reportData) => {
    console.log('Generazione report PDF in formato orizzontale');
    return await createPDF(reportData, true);
};
exports.generateLandscapeReport = generateLandscapeReport;
const createPDF = async (reportData, landscape) => {
    return new Promise(async (resolve, reject) => {
        var _a, _b, _c;
        try {
            console.log(`Creazione documento PDF in formato ${landscape ? 'orizzontale' : 'verticale'}`);
            // Creazione documento PDF con dimensione A4
            const doc = new pdfkit_1.default({
                size: 'A4',
                layout: landscape ? 'landscape' : 'portrait',
                margin: 50,
                info: {
                    Title: reportData.title || 'Report',
                    Author: reportData.author || 'PDF Generator Service',
                    CreationDate: new Date()
                }
            });
            // Buffer per raccogliere i dati del PDF
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(chunks);
                console.log(`PDF generato con successo (${pdfBuffer.length} bytes)`);
                resolve(pdfBuffer);
            });
            doc.on('error', (error) => {
                console.error('Errore nella generazione del PDF:', error);
                reject(error);
            });
            // Aggiunta intestazione
            if (reportData.title) {
                doc.fontSize(24).text(reportData.title, { align: 'center' });
                doc.moveDown();
            }
            // Aggiunta data generazione
            const dataOggi = new Date().toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            doc.fontSize(10).text(`Generato il: ${dataOggi}`, { align: 'right' });
            doc.moveDown();
            // Generazione e inserimento di ogni grafico
            for (let i = 0; i < reportData.charts.length; i++) {
                const chartData = reportData.charts[i];
                console.log(`Elaborazione grafico ${i + 1}/${reportData.charts.length}`);
                try {
                    // Renderizzazione del grafico come immagine
                    const chartBuffer = await (0, chartService_1.renderChart)(chartData);
                    // Ottimizzazione dell'immagine se necessario
                    const optimizedBuffer = await (0, imageUtils_1.optimizeImage)(chartBuffer);
                    // Calcolo dimensioni ottimali per inserimento nel PDF
                    const maxWidth = doc.page.width - (doc.page.margins.left + doc.page.margins.right);
                    const maxHeight = doc.page.height / 2.5; // altezza ragionevole per un grafico
                    // Inserimento immagine nel PDF
                    doc.image(optimizedBuffer, {
                        fit: [maxWidth, maxHeight],
                        align: 'center'
                    });
                    // Aggiunta didascalia o titolo del grafico se non già incluso nel grafico stesso
                    if (chartData.title && !((_c = (_b = (_a = chartData.options) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.title) === null || _c === void 0 ? void 0 : _c.display)) {
                        doc.fontSize(12).text(chartData.title, { align: 'center' });
                    }
                    doc.moveDown(2);
                    // Nuova pagina se necessario e non è l'ultimo grafico
                    if (doc.y > doc.page.height - 150 && i < reportData.charts.length - 1) {
                        console.log('Aggiunta nuova pagina al PDF');
                        doc.addPage({
                            size: 'A4',
                            layout: landscape ? 'landscape' : 'portrait',
                            margin: 50
                        });
                    }
                }
                catch (error) {
                    console.error(`Errore nell'elaborazione del grafico ${i + 1}:`, error);
                    // Aggiungiamo un messaggio di errore nel PDF invece di fallire completamente
                    doc.fontSize(12).fillColor('red').text(`Errore nella generazione del grafico: ${error.message}`);
                    doc.moveDown();
                }
            }
            // Aggiunta piè di pagina
            doc.fontSize(8).fillColor('gray').text('Generato da PDF Generator Service', {
                align: 'center'
            });
            // Finalizzazione del documento
            doc.end();
        }
        catch (error) {
            console.error('Errore generale nella creazione del PDF:', error);
            reject(error);
        }
    });
};
