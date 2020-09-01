const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const ProductOrder = require('./product-order')

Order.belongsTo(User)

Order.belongsToMany(Product, {through: ProductOrder})
Product.belongsToMany(Order, {through: ProductOrder})

module.exports = {
  User,
  Order,
  Product,
  ProductOrder
}
