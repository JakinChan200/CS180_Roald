const path = '../database/videos.json';
let videos = require(path);
const helper = require('../helpers/helper.js');

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