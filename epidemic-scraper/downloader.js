import fs from "node:fs";
import * as https from "node:https";

export async function downloadAudioFile(fileUrl, outputPath) {
    try {
        const file = fs.createWriteStream(outputPath);
        const request = https.get(fileUrl, function(response) {
            response.pipe(file);
        });
        
        return new Promise((resolve, reject) => {
            file.on('finish', function() {
                file.close();
                resolve();
            });
            
            file.on('error', function(error) {
                fs.unlink(outputPath, () => reject(error));
            });
        });
    } catch (error) {
        console.error('Download failed:', error.message);
        throw error;
    }
}