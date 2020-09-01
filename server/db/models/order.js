const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('ongoing', 'completed'),
    defaultValue: 'ongoing',
    validate: {
      isIn: [['ongoing', 'completed']]
    }
  }
})

module.exports = Order
