const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 todo model
const restaurant_information = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  console.log('running restaurantSeeder script')

  Restaurant.create(restaurant_information)
    .then(() => {
      console.log('done')
    })
    .catch(error => console.log(error))
})