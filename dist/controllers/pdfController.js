"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDFLandscape = exports.generatePDF = void 0;
const pdfService_1 = require("../services/pdfService");
const generatePDF = async (req, res) => {
    try {
        console.log('Richiesta di generazione PDF ricevuta');
        const reportData = req.body;
        // Validazione dati
        if (!reportData.charts || reportData.charts.length === 0) {
            console.error('Errore: Dati grafici mancanti');
            res.status(400).json({ error: 'Dati grafici mancanti' });
            return;
        }
        console.log(`Generazione PDF con ${reportData.charts.length} grafici`);
        // Generazione PDF
        const pdfBuffer = await (0, pdfService_1.generateReport)(reportData);
        // Invio PDF come risposta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
        res.send(pdfBuffer);
        console.log('PDF generato e inviato con successo');
    }
    catch (error) {
        console.error('Errore nella generazione del PDF:', error);
        res.status(500).json({ error: 'Errore nella generazione del PDF', details: error.message });
    }
};
exports.generatePDF = generatePDF;
const generatePDFLandscape = async (req, res) => {
    try {
        console.log('Richiesta di generazione PDF orizzontale ricevuta');
        const reportData = req.body;
        // Validazione dati
        if (!reportData.charts || reportData.charts.length === 0) {
            console.error('Errore: Dati grafici mancanti');
            res.status(400).json({ error: 'Dati grafici mancanti' });
            return;
        }
        console.log(`Generazione PDF orizzontale con ${reportData.charts.length} grafici`);
        // Generazione PDF in orizzontale
        const pdfBuffer = await (0, pdfService_1.generateLandscapeReport)(reportData);
        // Invio PDF come risposta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="report_landscape.pdf"');
        res.send(pdfBuffer);
        console.log('PDF orizzontale generato e inviato con successo');
    }
    catch (error) {
        console.error('Errore nella generazione del PDF orizzontale:', error);
        res.status(500).json({ error: 'Errore nella generazione del PDF orizzontale', details: error.message });
    }
};
exports.generatePDFLandscape = generatePDFLandscape;
