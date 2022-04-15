const express = require('express');
const router = express.Router();
const api = require('./countries.js');

// basic countries objects
var countries = [
    {id: 0, name: "Canada", abbrev: "CA"},
    {id: 1, name: "Germany", abbrev: "DE"},
    {id: 2, name: "France", abbrev: "FR"},
    {id: 3, name: "Great Britain", abbrev: "GB"},
    {id: 4, name: "India", abbrev: "IN"},
    {id: 5, name: "Japan", abbrev: "JP"},
    {id: 6, name: "Korea", abbrev: "KR"},
    {id: 7, name: "Mexico", abbrev: "MX"},
    {id: 8, name: "Russia", abbrev: "RU"},
    {id: 9, name: "United States", abbrev: "US"},
];

var categories = [
    {id: 0, name: "Film and Animation",},
    {id: 1, name: "Autos and Vehicles",},
    {id: 2, name: "Music",},
    {id: 3, name: "Pets and Animals",},
    {id: 4, name: "Sports",},
    {id: 5, name: "Short Movies",},
    {id: 6, name: "Travel and Events",},
    {id: 7, name: "Gaming",},
    {id: 8, name: "Videoblogging",},
    {id: 9, name: "People and Blogs",},
    {id: 10, name: "Comedy",},
    {id: 11, name: "Entertainment",},
    {id: 12, name: "News and Politics",},
    {id: 13, name: "Howto and Style",},
    {id: 14, name: "Education",},
    {id: 15, name: "Science and Technology",},
    {id: 16, name: "Movies",},
    {id: 17, name: "Anime/Animation",},
    {id: 18, name: "Action/Adventure",},
    {id: 19, name: "Classics",},
    {id: 20, name: "Comedy",},
    {id: 21, name: "Documentary",},
    {id: 22, name: "Drama",},
    {id: 23, name: "Family",},
    {id: 24, name: "Foreign",},
    {id: 25, name: "Horror",},
    {id: 26, name: "Sci-Fi/Fantasy",},
    {id: 27, name: "Thriller",},
    {id: 28, name: "Shorts",},
    {id: 29, name: "Shows",},
    {id: 30, name: "Trailers",},
    // US is only country with 31, this is the extra category
    {id: 31, name: "Nonprofits and Activism",},
];

// GET route for /countries/
// returns JSON version of the countries array
router.get('/', function(req, res) {
    res.json(countries);
});

// GET route for country by ID
router.get('/:id', function(req, res) {
    // since IDs are unique, filtering by ID should only assign one country to searchCountry
    var searchCountry = countries.filter(function(country){
        if (country.abbrev == req.params.id) {
            return true;
        }
    });

    var queryCategory = categories.filter(function(category) {
        if (category.name == req.query.category) {
            return true;
        }
    });
    if (queryCategory.length == 1) {
        res.json(queryCategory[0]);
    } else if (searchCountry.length == 1) {
        res.json(searchCountry[0]);
    } else { // server returns 404 if a valid route is visited with an ID that doesn't exist
        res.status(404);
        res.json({message: "Not Found"});
    }
});

module.exports = router;