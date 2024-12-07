import {buildGenreTree, getAudioList} from "./genres.js";
import {getGenrePath} from "./directories.js";
import {fetchGenres} from "./api.js";
import {downloadAudioFile} from "./downloader.js";
import fs from "node:fs";

const genres = await fetchGenres();
const genreTree = buildGenreTree(genres);

const rootDir = 'dist/genres';

for (const genre of genreTree) {
    for (const child of genre.children) {
        // Skip if the genre directory already exists
        const genrePath = getGenrePath(child.slug, rootDir);
        if (fs.existsSync(genrePath)) {
            console.log(`Skipping ${genre.displayTag}-${child.displayTag} as it already exists`);
            continue;
        }
        
        const audioList = await getAudioList(child);
        for (const audio of audioList) {
            const outputPath = `${getGenrePath(audio.genreSlug, rootDir)}/${audio.title}.mp3`;
            await downloadAudioFile(audio.url, outputPath).catch((error) => {
                console.error(`Download of ${audio.title} failed: ${error.message}`);
            });
        }

        console.log(`Downloaded ${audioList.length} audio files for ${genre.displayTag}-${child.displayTag}`);
    }
}

console.log('Download complete');