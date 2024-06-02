const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    description2: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'category'
  }
);

module.exports = Category;
