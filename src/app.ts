// Punto di ingresso dell'applicazione
import express from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdfRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/pdf', pdfRoutes);

// Endpoint di base per verificare che il server sia in esecuzione
app.get('/', (req, res) => {
  res.send('PDF Generator Service è attivo! Utilizza gli endpoint /api/pdf/generate o /api/pdf/generate-landscape per creare PDF.');
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});

export default app;