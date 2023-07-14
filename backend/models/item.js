const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Item extends Model {}

Item.init({
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
  vatRateSE: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sellable: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  popularity: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  underscored: false,
  timestamps: false,
  modelName: 'item',
})

module.exports = Item