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
  payment_id: {
    type: DataTypes.STRING,
    unique: true
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // BEGIN ADDRESS FIELDS
  email: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  postalcode: {
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
  country: {
    type: DataTypes.STRING
  },
  // END ADDRESS FIELDS
  order_amount: {
    type: DataTypes.INTEGER
  },
  order_tax_amount: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'order',
})

module.exports = Order