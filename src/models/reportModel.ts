// Definizione dei modelli dati per i report
export interface ChartDataset {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    [key: string]: any; // Altre proprietà specifiche del tipo di grafico
  }
  
  export interface ChartData {
    type: 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter';
    title?: string;
    labels: string[];
    datasets: ChartDataset[];
    options?: any;
  }
  
  export interface ReportData {
    title?: string;
    author?: string;
    charts: ChartData[];
    metadata?: Record<string, any>;
  }