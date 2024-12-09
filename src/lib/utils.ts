function generateArray(count: number) {
    return ' '.repeat(count).split('');
}

function slugify(displayName: string) {
    return displayName
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .replace(/ /g, '-');
}

export { generateArray, slugify };
