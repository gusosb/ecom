const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class OrderItem extends Model { }

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reference: { // => Internal ID of variant
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  total_amount: {
    type: DataTypes.INTEGER,
  },
  unit_price: {
    type: DataTypes.INTEGER,
  },
  total_discount_amount: {
    type: DataTypes.INTEGER,
  },
  tax_rate: {
    type: DataTypes.INTEGER,
  },
  total_tax_amount: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'orderitem',
  indexes: [
    {
      name: "unq_reford",
      unique: true,
      fields: ['reference', 'order_id'] // => variant ID and order ID are unique together, variant cannot exists twice in an order
    }
  ]
})

module.exports = OrderItem