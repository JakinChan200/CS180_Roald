const path = '../database/videos.json';
let videos = require(path);
const helper = require('../helpers/helper.js');
const json2csv = require('json2csv').parse;
const { writeFile } = require('fs').promises;
const fs = require('fs');
/* async function parseJSONFile(filename) {
    try {
        const file = await readFile(filename);
        return JSON.parse(JSON.stringify(file));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}*/

async function JSONtoCSV() {
    var data = JSON.parse(fs.readFileSync('./database/videos.json'));
    var fields = ['username', 'videoID', 'pubDate'];
    var csv = "";
    if (data.length !== 0) {
        csv = json2csv(data, fields);
    } else {
        csv = '"username","videoID","pubDate"';
    }
    writeFile('./csv/ADDLvideos.csv', csv, function(err) {
        if (err) console.log('ERROR WRITING TO CSV');
        console.log('Saved to CSV');
    });
}

function getVideos() {
    return new Promise((resolve, reject) => {
        if (videos.length === 0) {
            reject({
                message: 'No videos available',
                status: 202
            })
        }
        resolve(videos)
    })
}

function getVideo(id) {
    return new Promise((resolve, reject) => {
        helper.findInArray(videos, id)
        .then(video => resolve(video))
        .catch(err => reject(err))
    })
}

function insertVideo(newVideo) {
    return new Promise((resolve, reject) => {
        videos.push(newVideo);
        helper.writeJSONFile('./database/videos.json', videos);
        JSONtoCSV();
        resolve(newVideo)
    })
}

function updateVideo(id, newVideo) {
    return new Promise((resolve, reject) => {
        helper.findInArray(videos, id)
        .then(video => {
            const index = videos.findIndex(v => v.videoID == id);
            videos[index] = newVideo;
            helper.writeJSONFile('./database/videos.json', videos);
            JSONtoCSV();
            resolve(videos[index]);
        })
        .catch(err => reject(err))
    })
}

function deleteVideo(id) {
    return new Promise((resolve, reject) => {
        helper.findInArray(videos, id)
        .then(() => {
            videos = videos.filter(v => v.videoID !== id);
            helper.writeJSONFile('./database/videos.json', videos);
            JSONtoCSV();
            resolve();
        })
        .catch(err => reject(err));
    })
}

module.exports = {
    getVideos,
    getVideo,
    insertVideo,
    updateVideo,
    deleteVideo
}