import fs from "node:fs";

export function getGenrePath(slug, baseDir) {
    return baseDir + '/' + slug.replace(/--/g, '/');
}

export function createGenreDirectories(genreTree, baseDir) {
    if (!fs.existsSync(baseDir))
        fs.mkdirSync(baseDir, { recursive: true });

    genreTree.forEach((genre) => {
        const genreDir = getGenrePath(genre.slug, baseDir);
        
        if (!fs.existsSync(genreDir))
            fs.mkdirSync(genreDir);
        
        genre.children.forEach((child) => {
            const subGenreDir = getGenrePath(child.slug, baseDir);
            
            if (!fs.existsSync(subGenreDir))
                fs.mkdirSync(subGenreDir);
        });
    })
}