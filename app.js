const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

const app = express()
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
const port = 3000

const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantinfos => res.render('index', { restaurantinfos }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)


  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywords = req.query.keywords

  const filterRestaurant = restaurantList.results.filter(data => {
    return data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
  })
  res.render('index', { restaurant: filterRestaurant, keywords })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

