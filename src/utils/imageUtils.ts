// Utilità per l'ottimizzazione delle immagini
import sharp from 'sharp';

export const optimizeImage = async (imageBuffer: Buffer): Promise<Buffer> => {
  try {
    console.log(`Ottimizzazione immagine (dimensione originale: ${imageBuffer.length} bytes)`);
    
    // Ottimizzazione dell'immagine per ridurre dimensioni
    const optimizedBuffer = await sharp(imageBuffer)
      .png({ quality: 85, compressionLevel: 8 })
      .toBuffer();
    
    console.log(`Immagine ottimizzata (nuova dimensione: ${optimizedBuffer.length} bytes, riduzione: ${Math.round((1 - optimizedBuffer.length / imageBuffer.length) * 100)}%)`);
    return optimizedBuffer;
  } catch (error) {
    console.error('Errore nell\'ottimizzazione dell\'immagine:', error);
    console.log('Utilizzo dell\'immagine originale come fallback');
    // Restituzione dell'immagine originale in caso di errore
    return imageBuffer;
  }
};