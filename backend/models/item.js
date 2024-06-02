const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    price_sek: {
      type: DataTypes.INTEGER
    },
    price_eur: {
      type: DataTypes.INTEGER
    },
    vatRateSE: {
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sellable: {
      type: DataTypes.INTEGER
    },
    popularity: {
      type: DataTypes.FLOAT
    },
    brand: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    sku: {
      type: DataTypes.STRING
    },
    details: {
      type: DataTypes.STRING
    },
    sizefit: {
      type: DataTypes.STRING
    },
    care: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    underscored: false,
    timestamps: false,
    modelName: 'item'
  }
);

module.exports = Item;
