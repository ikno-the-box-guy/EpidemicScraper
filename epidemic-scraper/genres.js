const buildGenreTree = (genres) => {
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

export default buildGenreTree;