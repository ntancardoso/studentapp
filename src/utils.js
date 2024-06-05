export const sort = (array, key, order) => {
    const returnValue = order === 'desc' ? 1 : -1;

    return array.sort((a, b) => a[key] > b[key] ? returnValue * -1 : returnValue);
};

export const dispatch = (event, detail) => {
    document.dispatchEvent(new CustomEvent(event, {
        detail
    }));
}

export const listen = (event, callback) => {
    document.addEventListener(event, e => callback(e));
}

export const paginate = (array, itemsPerChunk) => {
    return Array(Math.ceil(array.length / itemsPerChunk))
        .fill()
        .map((_, index) => index * itemsPerChunk)
        .map(index => array.slice(index, index + itemsPerChunk));
}