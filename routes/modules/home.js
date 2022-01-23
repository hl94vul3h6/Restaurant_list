const express = require('express')
const router = express.Router()

const Restaurant = require("../../models/restaurant")

router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurantinfos) => res.render("index", {
      restaurantinfos
    }))
    .catch((error) => console.log(error));
});

//search bar
router.get("/search", (req, res) => {
  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();
  Restaurant.find({})
    .lean()
    .then((restaurant) => {
      const filterRestaurantsData = restaurant.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      );
      res.render("index", {
        restaurantinfos: filterRestaurantsData,
        keywords
      });
    })
    .catch((err) => console.log(err));
});

// Dropdown
router.get('/sort/:sort', (req, res) => {
  const sort = req.params.sort

  Restaurant.find()
    .lean()
    .sort(`${sort}`)
    .then(restaurantinfos => res.render('index', { restaurantinfos }))
    .catch(error => console.log(error))
})

module.exports = router