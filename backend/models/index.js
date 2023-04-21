const User = require('./user')

const { sequelize } = require('../util/db')

sequelize.sync({ alter: true })


module.exports = {
  User
}