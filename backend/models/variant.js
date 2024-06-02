const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Variant extends Model {}

Variant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sellable: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    underscored: false,
    timestamps: false,
    modelName: 'variant'
  }
);

module.exports = Variant;
