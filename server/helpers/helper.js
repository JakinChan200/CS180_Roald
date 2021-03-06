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

function writeJSONFile(file, content) {
    fs.writeFileSync(file, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    findInArray,
    writeJSONFile
}