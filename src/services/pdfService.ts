// Servizio principale per la generazione dei PDF
import PDFDocument from 'pdfkit';
import { renderChart } from './chartService';
import { optimizeImage } from '../utils/imageUtils';
import { ReportData } from '../models/reportModel';

export const generateReport = async (reportData: ReportData): Promise<Buffer> => {
  console.log('Generazione report PDF in formato verticale');
  return await createPDF(reportData, false);
};

export const generateLandscapeReport = async (reportData: ReportData): Promise<Buffer> => {
  console.log('Generazione report PDF in formato orizzontale');
  return await createPDF(reportData, true);
};

const createPDF = async (reportData: ReportData, landscape: boolean): Promise<Buffer> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Creazione documento PDF in formato ${landscape ? 'orizzontale' : 'verticale'}`);
      
      // Creazione documento PDF con dimensione A4
      const doc = new PDFDocument({
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
      const chunks: Buffer[] = [];
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
        console.log(`Elaborazione grafico ${i+1}/${reportData.charts.length}`);
        
        try {
          // Renderizzazione del grafico come immagine
          const chartBuffer = await renderChart(chartData);
          
          // Ottimizzazione dell'immagine se necessario
          const optimizedBuffer = await optimizeImage(chartBuffer);
          
          // Calcolo dimensioni ottimali per inserimento nel PDF
          const maxWidth = doc.page.width - (doc.page.margins.left + doc.page.margins.right);
          const maxHeight = doc.page.height / 2.5; // altezza ragionevole per un grafico
          
          // Inserimento immagine nel PDF
          doc.image(optimizedBuffer, {
            fit: [maxWidth, maxHeight],
            align: 'center'
          });
          
          // Aggiunta didascalia o titolo del grafico se non già incluso nel grafico stesso
          if (chartData.title && !chartData.options?.plugins?.title?.display) {
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
        } catch (error) {
          console.error(`Errore nell'elaborazione del grafico ${i+1}:`, error);
          // Aggiungiamo un messaggio di errore nel PDF invece di fallire completamente
          doc.fontSize(12).fillColor('red').text(`Errore nella generazione del grafico: ${(error as Error).message}`);          doc.moveDown();
        }
      }

      // Aggiunta piè di pagina
      doc.fontSize(8).fillColor('gray').text('Generato da PDF Generator Service', {
        align: 'center'
      });

      // Finalizzazione del documento
      doc.end();
    } catch (error) {
      console.error('Errore generale nella creazione del PDF:', error);
      reject(error);
    }
  });
};