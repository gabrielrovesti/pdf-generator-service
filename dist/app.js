"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Punto di ingresso dell'applicazione
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
// Routes
app.use('/api/pdf', pdfRoutes_1.default);
// Endpoint di base per verificare che il server sia in esecuzione
app.get('/', (req, res) => {
    res.send('PDF Generator Service è attivo! Utilizza gli endpoint /api/pdf/generate o /api/pdf/generate-landscape per creare PDF.');
});
// Avvio server
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
exports.default = app;
