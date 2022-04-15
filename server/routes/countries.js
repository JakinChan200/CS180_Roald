const express = require("express");
const router = express.Router();
// importing functions on start
const db = require("../database/database");

// basic countries objects
const countries = {
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  KR: "Korea",
  IN: "India",
  MX: "Mexico",
  RU: "Russia",
  JP: "Japan",
  US: "United States",
  GB: "Great Britain",
};

var categories = [
  { id: 0, name: "Film and Animation" },
  { id: 1, name: "Autos and Vehicles" },
  { id: 2, name: "Music" },
  { id: 3, name: "Pets and Animals" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Short Movies" },
  { id: 6, name: "Travel and Events" },
  { id: 7, name: "Gaming" },
  { id: 8, name: "Videoblogging" },
  { id: 9, name: "People and Blogs" },
  { id: 10, name: "Comedy" },
  { id: 11, name: "Entertainment" },
  { id: 12, name: "News and Politics" },
  { id: 13, name: "Howto and Style" },
  { id: 14, name: "Education" },
  { id: 15, name: "Science and Technology" },
  { id: 16, name: "Movies" },
  { id: 17, name: "Anime/Animation" },
  { id: 18, name: "Action/Adventure" },
  { id: 19, name: "Classics" },
  { id: 20, name: "Comedy" },
  { id: 21, name: "Documentary" },
  { id: 22, name: "Drama" },
  { id: 23, name: "Family" },
  { id: 24, name: "Foreign" },
  { id: 25, name: "Horror" },
  { id: 26, name: "Sci-Fi/Fantasy" },
  { id: 27, name: "Thriller" },
  { id: 28, name: "Shorts" },
  { id: 29, name: "Shows" },
  { id: 30, name: "Trailers" },
  // US is only country with 31, this is the extra category
  { id: 31, name: "Nonprofits and Activism" },
];

// GET route for /countries/
// returns JSON version of the countries array
router.get("/", function (req, res) {
  res.json(countries);
});

// GET route for country by ID
router.get("/:id", function (req, res) {
  //get country by abbrev
  let data = { message: "Not Found" };
  let searchCountry = countries[req.params.id];
  if (searchCountry) data = db.getData(req.params.id);
  if (!req.query) return res.json(data);

  //continue to fetch categories
  let queryCategory = data.filter(
    (video) => video.category_id == req.query
  );
  console.log(data);
  console.log(queryCategory);

  if (queryCategory.length >= 1) {
    res.json(queryCategory);
  } else {
    // server returns 404 if a valid route is visited with an ID that doesn't exist
    res.status(404);
    res.json({ message: "Not Found" });
  }
});

module.exports = router;
