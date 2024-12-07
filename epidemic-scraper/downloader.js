import fs from "node:fs";
import * as https from "node:https";
import * as path from "node:path";

export async function downloadAudioFile(fileUrl, outputPath) {
    try {
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, {recursive: true});
        
        const file = fs.createWriteStream(outputPath);
        https.get(fileUrl, (response) => {
            response.pipe(file);
        });
        
        return new Promise((resolve, reject) => {
            file.on('finish', () => {
                file.close();

                const stats = fs.statSync(outputPath);
                if (stats.size === 0) {
                    fs.unlinkSync(outputPath);
                    reject(new Error("Downloaded file is 0KB"));
                    return;
                }
                
                resolve();
            });
            
            file.on('error', function(error) {
                console.error('Download failed:', error.message);
                fs.unlink(outputPath, () => reject(error));
            });
        });
    } catch (error) {
        console.error('Download failed:', error.message);
        throw error;
    }
}