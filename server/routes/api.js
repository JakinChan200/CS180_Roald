const express = require('express');
const router = express.Router();

// GET method for /api/
router.get('/', function(req, res) {
    res.send('GET route on api');
});

// POST method for /api/
router.post('/', function(req, res) {
    res.send('POST route on api');
});

// exporting the router to be used by index.js
module.exports = router;