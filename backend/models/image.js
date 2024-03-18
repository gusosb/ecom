const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Image extends Model { }

Image.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: DataTypes.STRING,
  },
  index: {
    type: DataTypes.INTEGER,
  },
  isHover: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: false,
  timestamps: false,
  modelName: 'image',
})

module.exports = Image