const fs = require('fs')

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1;
    } else {
        return 1;
    }
}

function findInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.videoID == id);
        if (!row) {
            reject({
                message: 'ID not found',
                status: 404
            });
        }
        resolve(row);
    })
}

function writeJSONFile(file, content) {
    fs.writeFileSync(file, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    findInArray,
    writeJSONFile
}