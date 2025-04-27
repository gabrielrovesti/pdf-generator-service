"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Definizione delle route per la generazione PDF
const express_1 = require("express");
const pdfController_1 = require("../controllers/pdfController");
const router = (0, express_1.Router)();
// Endpoint per PDF in formato verticale (portrait)
router.post('/generate', pdfController_1.generatePDF);
// Endpoint per PDF in formato orizzontale (landscape)
router.post('/generate-landscape', pdfController_1.generatePDFLandscape);
exports.default = router;
