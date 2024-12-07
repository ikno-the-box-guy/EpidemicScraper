import buildGenreTree from "./genres.js";

fetch('https://www.epidemicsound.com/json/tags/?sfx_tag=true').then(response => response.json()).then(data => {
    // const genres = buildGenreTree(data.genres);
    
    let trackCount = 0;
    data.genres.forEach((genre) => {
        trackCount += genre.numTracks;
    });
    
    console.log(trackCount)
});