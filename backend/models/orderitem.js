const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class OrderItem extends Model { }

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  vatRate: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'orderitem',
})

module.exports = OrderItem