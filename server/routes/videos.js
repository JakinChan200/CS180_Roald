// the videos collection endpoint is specifically for CRUD operations on user-submitted/uploaded videos
const fs = require('fs');
const multer = require('multer')();
const express = require('express');
const router = express.Router();
const video = require('../models/video.model');

// GET route for /api/videos/
router.get('/', multer.any(), async (req, res) => {
    await video.getVideos()
    .then(videos => res.json(videos))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    })
});

// can add second argument to do validation on id
router.get('/:id', multer.any(), async (req, res) => {
    const id = req.params.id;

    await video.getVideo(id)
    .then(video => res.json(video))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    })
})

// POST route for /api/videos/
router.post('/', multer.any(), async (req, res) => {
    const newVideo = {username: req.body.username, videoID: req.body.videoID, pubDate: req.body.pubDate};
    await video.insertVideo(newVideo)
    .then(video => res.status(201).json({
        message: `The video with ID ${video.videoID} has been posted.`,
        content: video
    }))
    .catch(err => res.status(500).json({message: err.message}))
});

router.put('/:id', multer.any(), async (req, res) => {
    const id = req.params.id;
    const updatedVideo = {username: req.body.username, videoID: req.body.videoID, pubDate: req.body.pubDate};

    await video.updateVideo(id, updatedVideo)
    .then(video => res.json({
        message: `The video with ID #${id} has been updated.`,
        content: video
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message})
        }
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', multer.any(), async (req, res) => {
    const id = req.params.id;

    await video.deleteVideo(id)
    .then(video => res.json({
        message: `The post with ID ${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message})
        }
        res.status(500).json({message: err.message})
    })
})

module.exports = router;