const fs = require('fs')

function findInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.username == id);
        if (!row) {
            reject({
                message: 'User not found',
                status: 404
            });
        }
        resolve(row);
    })
}

function findInArrayByUsername(array, username) {
    return new Promise((resolve, reject) => {
        const videos = array.filter(video => video.username == username);
        if (videos.length === 0) {
            reject({
                message: 'No videos found.',
                status: 404
            });
        }
        resolve(videos);
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
    findInArray,
    findInArrayByUsername,
    writeJSONFile
}