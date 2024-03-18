const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Item extends Model { }

Item.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  vatRateSE: {
    type: DataTypes.INTEGER,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sellable: {
    type: DataTypes.INTEGER,
  },
  popularity: {
    type: DataTypes.FLOAT,
  },
  brand: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  specification: {
    type: DataTypes.STRING,
  },
  sku: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  underscored: false,
  timestamps: false,
  modelName: 'item',
})

module.exports = Item