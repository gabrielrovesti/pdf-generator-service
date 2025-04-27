// Definizione delle route per la generazione PDF
import { Router } from 'express';
import { generatePDF, generatePDFLandscape } from '../controllers/pdfController';

const router = Router();

// Endpoint per PDF in formato verticale (portrait)
router.post('/generate', generatePDF);

// Endpoint per PDF in formato orizzontale (landscape)
router.post('/generate-landscape', generatePDFLandscape);

export default router;