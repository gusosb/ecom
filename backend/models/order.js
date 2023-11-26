const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Order extends Model { }

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  externalId: {
    type: DataTypes.STRING,
    unique: true
  },
  klarna_order_id: {
    type: DataTypes.STRING
  },
  customer: {
    type: DataTypes.STRING
  },
  // BEGIN ADDRESS FIELDS
  given_name: {
    type: DataTypes.STRING
  },
  family_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  street_address: {
    type: DataTypes.STRING
  },
  postal_code: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  region: {
    type: DataTypes.STRING
  },
  care_of: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  // END ADDRESS FIELDS
  initial_payment_method: {
    type: DataTypes.STRING
  },
  order_amount: {
    type: DataTypes.INTEGER
  },
  order_tax_amount: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'order',
})

module.exports = Order