const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    underscored: false,
    timestamps: false,
    modelName: 'review'
  }
);

module.exports = Review;
