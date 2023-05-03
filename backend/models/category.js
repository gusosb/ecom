const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'category',
})

module.exports = Category