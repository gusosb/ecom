const User = require('./user')
const Site = require('./site')

const { sequelize } = require('../util/db')

sequelize.sync({ alter: true })


module.exports = {
  User
}