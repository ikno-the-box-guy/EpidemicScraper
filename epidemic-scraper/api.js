export async function fetchGenres() {
    const response = await fetch('https://www.epidemicsound.com/json/tags/?sfx_tag=true');
    const data = await response.json();
    return data.genres;
}

export async function fetchGenrePage(genre, page) {
    const response = await fetch(`https://www.epidemicsound.com/json/search/sfx/?page=${page}&genres=${genre.slug}`);
    return await response.json();
}