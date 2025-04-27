// Controller per gestire le richieste di generazione PDF
import { Request, Response } from 'express';
import { generateReport, generateLandscapeReport } from '../services/pdfService';
import { ReportData } from '../models/reportModel';

export const generatePDF = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Richiesta di generazione PDF ricevuta');
    const reportData: ReportData = req.body;
    
    // Validazione dati
    if (!reportData.charts || reportData.charts.length === 0) {
      console.error('Errore: Dati grafici mancanti');
      res.status(400).json({ error: 'Dati grafici mancanti' });
      return;
    }
    
    console.log(`Generazione PDF con ${reportData.charts.length} grafici`);
    
    // Generazione PDF
    const pdfBuffer = await generateReport(reportData);
    
    // Invio PDF come risposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
    res.send(pdfBuffer);
    console.log('PDF generato e inviato con successo');
  } catch (error) {
    console.error('Errore nella generazione del PDF:', error);
    res.status(500).json({ error: 'Errore nella generazione del PDF', details: (error as Error).message });
  }
};

export const generatePDFLandscape = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Richiesta di generazione PDF orizzontale ricevuta');
    const reportData: ReportData = req.body;
    
    // Validazione dati
    if (!reportData.charts || reportData.charts.length === 0) {
      console.error('Errore: Dati grafici mancanti');
      res.status(400).json({ error: 'Dati grafici mancanti' });
      return;
    }
    
    console.log(`Generazione PDF orizzontale con ${reportData.charts.length} grafici`);
    
    // Generazione PDF in orizzontale
    const pdfBuffer = await generateLandscapeReport(reportData);
    
    // Invio PDF come risposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="report_landscape.pdf"');
    res.send(pdfBuffer);
    console.log('PDF orizzontale generato e inviato con successo');
  } catch (error) {
    console.error('Errore nella generazione del PDF orizzontale:', error);
    res.status(500).json({ error: 'Errore nella generazione del PDF orizzontale', details: (error as Error).message });
  }
};