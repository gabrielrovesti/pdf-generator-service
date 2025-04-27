"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderChart = void 0;
// Servizio per renderizzare grafici ChartJS lato server
const chart_js_1 = require("chart.js");
const chartjs_node_canvas_1 = require("chartjs-node-canvas");
// Registrazione dei componenti necessari di Chart.js
const chart_js_2 = require("chart.js");
chart_js_1.Chart.register(...chart_js_2.registerables); // Registrazione globale
// Configurazione del canvas renderer con dimensioni ragionevoli
const width = 800;
const height = 600;
// Configurazione corretta di ChartJSNodeCanvas
const canvasRenderService = new chartjs_node_canvas_1.ChartJSNodeCanvas({
    width,
    height,
    backgroundColour: 'white'
    // Rimuovi la proprietà plugins se non hai plugin specifici da caricare
});
const renderChart = async (chartData) => {
    try {
        console.log(`Renderizzazione grafico di tipo: ${chartData.type}`);
        // Configurazione di base per tutti i grafici
        const defaultOptions = {
            responsive: false,
            animation: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
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
        const configuration = {
            type: chartData.type,
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
    }
    catch (error) {
        console.error('Errore nella renderizzazione del grafico:', error);
        throw new Error(`Impossibile renderizzare il grafico: ${error.message}`);
    }
};
exports.renderChart = renderChart;
