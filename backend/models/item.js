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
  image: {
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
}, {
  sequelize,
  underscored: false,
  timestamps: false,
  modelName: 'item',
})

module.exports = Item