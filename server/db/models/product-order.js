const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('ProductOrder', {
  quantity: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = ProductOrder
