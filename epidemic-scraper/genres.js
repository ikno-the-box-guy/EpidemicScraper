import {fetchGenrePage} from "./api.js";

export function buildGenreTree(genres) {
    const genreMap = new Map();

    genres.forEach((tag) => {
        tag.children = [];
        genreMap.set(tag.id, tag);
    });

    const tree = [];

    genres.forEach((genre) => {
        const parentId = genre.fatherGenreId;
        if (parentId && genreMap.has(parentId)) {
            genreMap.get(parentId).children.push(genre);
        } else {
            tree.push(genre);
        }
    });

    return tree;
}

export async function getAudioList(genre) {
    let pages = 1;

    const audioList = [];
    
    for (let i = 1; i <= pages && i <= 51; i++) {
        const data = await fetchGenrePage(genre, i);
        
        if (!data.meta || !data.meta.totalPages) {
            console.error('Invalid response:', data);
            break;
        }
        
        pages = data.meta.totalPages;
        
        Object.values(data.entities.tracks).forEach((track) => {
            const trackGenre = track.genres[0] || genre;
            
            audioList.push({
                title: track.title,
                url: track.stems.full.lqMp3Url,
                genreSlug: trackGenre.slug
            });
        });
    }
    
    return audioList;
}