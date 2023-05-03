const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class OrderItem extends Model {}

OrderItem.init({
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
  modelName: 'orderitem',
})

module.exports = OrderItem