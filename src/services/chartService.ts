// Servizio per renderizzare grafici ChartJS lato server
import { ChartConfiguration, Chart } from 'chart.js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { ChartData } from '../models/reportModel';

// Registrazione dei componenti necessari di Chart.js
import { registerables } from 'chart.js';
Chart.register(...registerables);  // Registrazione globale

// Configurazione del canvas renderer con dimensioni ragionevoli
const width = 800;
const height = 600;

// Configurazione corretta di ChartJSNodeCanvas
const canvasRenderService = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour: 'white'
  // Rimuovi la proprietà plugins se non hai plugin specifici da caricare
});

export const renderChart = async (chartData: ChartData): Promise<Buffer> => {
  try {
    console.log(`Renderizzazione grafico di tipo: ${chartData.type}`);
    
    // Configurazione di base per tutti i grafici
    const defaultOptions = {
      responsive: false,
      animation: false,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const
        },
        title: {
          display: !!chartData.title,
          text: chartData.title || '',
          font: {
            size: 16
          }
        }
      }
    };
    
    // Merge delle opzioni personalizzate con quelle di default
    const chartOptions = {
      ...defaultOptions,
      ...(chartData.options || {})
    };
    
    // Configurazione completa del grafico
    const configuration: ChartConfiguration = {
      type: chartData.type as any,
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets
      },
      options: chartOptions
    };
    
    // Renderizzazione del grafico su canvas
    const buffer = await canvasRenderService.renderToBuffer(configuration);
    console.log(`Grafico renderizzato con successo (${buffer.length} bytes)`);
    return buffer;
  } catch (error) {
    console.error('Errore nella renderizzazione del grafico:', error);
    throw new Error(`Impossibile renderizzare il grafico: ${(error as Error).message}`);
  }
};