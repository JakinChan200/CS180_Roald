// the videos collection endpoint is specifically for CRUD operations on user-submitted/uploaded videos
const fs = require('fs');
const multer = require('multer')();
const express = require('express');
const router = express.Router();

// GET route for /api/videos/
router.get('/', (req, res) => {
    res.send('This is the GET route for the user-submitted videos.');
});

// POST route for /api/videos/
router.post('/', multer.any(), (req, res) => {
    const username = req.body.username;
    const videoID = req.body.videoID;
    const pubDate = req.body.pubDate;

    // basic input validation
    if (!username || !videoID || !pubDate) {
        return res.status(400).json({success: false, message: 'Please enter all necessary data.'});
    }
    
    // turn the data into a CSV string
    const newVideo = [username, videoID, pubDate].join(",") + '\n';

    const path = './csv/ADDLvideos.csv';
    fs.appendFile(path, newVideo, function(err) {
        if (err) {
            console.error(err)
            return res.status(400).json({success: false, message: 'An error when writing the data to the file.'});
        }

        res.download(path, 'file.csv');
    });
});

module.exports = router;