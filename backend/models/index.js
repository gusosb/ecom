const User = require('./user')
const Site = require('./site')
const Category = require('./category')
const Item = require('./item')
const Order = require('./order')
const OrderItem = require('./orderitem')

const { sequelize } = require('../util/db')

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Category.belongsToMany(Category, { as: 'SubOne', through: 'CategorySubOne' })
Category.belongsToMany(Category, { as: 'SubTwo', through: 'CategorySubTwo' })

Category.hasMany(Item)
Item.belongsTo(Category)

sequelize.sync({ alter: true })


module.exports = {
  User, Site, Category, Item, Order, OrderItem
}