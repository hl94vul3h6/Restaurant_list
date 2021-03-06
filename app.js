const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const methodOveride = require('method-override')
require("./config/mongoose"); //- 引用mongoose;

const app = express()
const routes = require('./routes')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
const port = 3000
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOveride('_method'))
app.use(routes)
// db.on('error', () => {
//   console.log('mongodb error')
// })

// db.once('open', () => {
//   console.log('mongodb connected')
// })

// app.get('/', (req, res) => {
//   Restaurant.find()
//     .lean()
//     .then(restaurantinfos => res.render('index', { restaurantinfos }))
//     .catch(error => console.log(error))
// })

// app.get("/restaurants/new", (req, res) => {
//   res.render("new")
// })

// app.post("/restaurants", (req, res) => {
//   Restaurant.create(req.body)
//     .then(() => res.redirect("/"))
//     .catch(err => console.log(err))
// })

// app.get("/restaurants/:restaurantId", (req, res) => {
//   const { restaurantId } = req.params
//   Restaurant.findById(restaurantId)
//     .lean()
//     .then(restaurantData => res.render("show", { restaurantData }))
//     .catch(err => console.log(err))
// })


// app.get("/restaurants/:restaurantId/edit", (req, res) => {
//   const { restaurantId } = req.params
//   Restaurant.findById(restaurantId)
//     .lean()
//     .then(restaurantinfos => res.render("edit", { restaurantinfos }))
//     .catch(err => console.log(err))
// })

// app.put("/restaurants/:restaurantId", (req, res) => {
//   const { restaurantId } = req.params
//   Restaurant.findByIdAndUpdate(restaurantId, req.body)

//     .then(() => res.redirect(`/restaurants/${restaurantId}`))
//     .catch(err => console.log(err))
// })


// app.delete("/restaurants/:restaurantId", (req, res) => {
//   const { restaurantId } = req.params
//   Restaurant.findByIdAndDelete(restaurantId)
//     .then(() => res.redirect("/"))
//     .catch(err => console.log(err))
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.trim().toLowerCase()
//   const keywords = req.query.keywords

//   const filterRestaurant = restaurantList.results.filter(data => {
//     return data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
//   })
//   res.render('index', { restaurant: filterRestaurant, keywords })
// })

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

