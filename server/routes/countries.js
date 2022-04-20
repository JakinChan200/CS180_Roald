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
  if (!req.query.id) return res.json(data);

  //continue to fetch categories
  console.log("query", req.query);
  let queryCategory = data.filter((video) => video.category_id == req.query.id);
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
