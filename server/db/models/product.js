const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  coverImg: {
    type: Sequelize.TEXT,
    defaultValue: 'https://wfbf.com/wp-content/uploads/2016/08/cover.jpg',
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  },
  ratingCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  synopsis: {
    type: Sequelize.TEXT,
    defaultValue:
      "Yeah! Attorney-client privilege. I mean, that's a big one. That's something I provide for you. If I give up Pinkman, well, then you're gonna be asking, 'Ol' Saul gives 'em up pretty easy. What's to keep him from giving me up?' Y'see, so, then where's the trust? ",
  },
})

module.exports = Product
