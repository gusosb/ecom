const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'order',
})

module.exports = Order