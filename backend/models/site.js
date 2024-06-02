const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Site extends Model {}

Site.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'site'
  }
);

module.exports = Site;
