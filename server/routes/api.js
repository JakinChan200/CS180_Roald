// file system module for reading and writing from/to files
const fs = require('fs');

// idek what this really does, i didnt look into it much but it helped with reading requests i think
const multer = require('multer')();

// boilerplate express router stuff
const express = require('express');
const router = express.Router();

// models for users and for videos
const user = require('../models/user.model');

/*
GET /api/
returns all the users
*/
router.get('/', multer.any(), async (req, res) => {
    await user.getUsers()
    .then(users => res.json(users))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    })
});

/*
GET /api/:username
returns a requested user object given a username
*/
router.get('/:username', multer.any(), async (req, res) => {
    const username = req.params.username;

    await user.getUser(username)
    .then(user => res.json(user))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    })
})

/*
POST /api/
adds a new user with given videos array
request body should have {username: str, videos: [str]}
*/
router.post('/', multer.any(), async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({message: 'Please enter all fields necessary.'});
        res.end();
    }
    else {
        const newUser = {username: req.body.username, videos: req.body.videos};
        await user.insertUser(newUser)
        .then(user => res.status(201).json({
            message: `The user with username ${user.username} has been added.`,
            content: user
        }))
        .catch(err => res.status(500).json({message: err.message}))
    }
});

/*
PUT /api/:username
updates a user given a username
*/
router.put('/:id', multer.any(), async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({message: 'Please enter all fields necessary.'});
        res.end();
    }
    else {
        const updatedUser = {username: req.body.username, videos: req.body.videos};
        await user.updateUser(req.params.id, updatedUser)
        .then(u => res.json({
            message: `The user with username ${updatedUser.username} has been updated.`,
            content: u
        }))
        .catch(err => res.status(500).json({message: err.message}))
    }
})

/*
DELETE /api/:username
deletes a user given a username
*/
router.delete('/:id', multer.any(), async (req, res) => {
    const username = req.params.id;

    await user.deleteUser(username)
    .then(user => res.json({
        message: `The user with username ${username} has been deleted`
    }))
    .catch(err => res.status(500).json({message: err.message}))
})

module.exports = router;