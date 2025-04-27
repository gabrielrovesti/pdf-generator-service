"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeImage = void 0;
// Utilità per l'ottimizzazione delle immagini
const sharp_1 = __importDefault(require("sharp"));
const optimizeImage = async (imageBuffer) => {
    try {
        console.log(`Ottimizzazione immagine (dimensione originale: ${imageBuffer.length} bytes)`);
        // Ottimizzazione dell'immagine per ridurre dimensioni
        const optimizedBuffer = await (0, sharp_1.default)(imageBuffer)
            .png({ quality: 85, compressionLevel: 8 })
            .toBuffer();
        console.log(`Immagine ottimizzata (nuova dimensione: ${optimizedBuffer.length} bytes, riduzione: ${Math.round((1 - optimizedBuffer.length / imageBuffer.length) * 100)}%)`);
        return optimizedBuffer;
    }
    catch (error) {
        console.error('Errore nell\'ottimizzazione dell\'immagine:', error);
        console.log('Utilizzo dell\'immagine originale come fallback');
        // Restituzione dell'immagine originale in caso di errore
        return imageBuffer;
    }
};
exports.optimizeImage = optimizeImage;
