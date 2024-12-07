import {buildGenreTree, getAudioList} from "./genres.js";
import {createGenreDirectories, getGenrePath} from "./directories.js";
import {fetchGenres} from "./api.js";
import {downloadAudioFile} from "./downloader.js";

const genres = await fetchGenres();
const genreTree = buildGenreTree(genres);

const rootDir = 'dist/genres';
createGenreDirectories(genreTree, rootDir);

for (const genre of genreTree) {
    for (const child of genre.children) {
        const audioList = await getAudioList(child);
        audioList.forEach((audio) => {
            const outputPath = `${getGenrePath(audio.genreSlug, rootDir)}/${audio.title}.mp3`;
            downloadAudioFile(audio.url, outputPath).catch((error) => {
                console.error(`Download of ${audio.title} failed: ${error.message}`);
            });
        });
        
        console.log(`Downloaded ${audioList.length} audio files for ${child.name}`);
    }
}

console.log('Download complete');