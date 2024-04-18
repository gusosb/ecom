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
  is_paid: {
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
  address2: {
    type: DataTypes.STRING
  },
  postalcode: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  care_of: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  // END ADDRESS FIELDS
  order_amount: { // => gross
    type: DataTypes.INTEGER
  },
  order_tax_amount: { // => total order tax amount
    type: DataTypes.INTEGER
  },
  order_reference: {
    type: DataTypes.STRING,
  },
  tracking: {
    type: DataTypes.STRING,
  },
  is_fulfilled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_posted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verification_number: {
    type: DataTypes.INTEGER
  },
  is_settled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  currency: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'order',
  hooks: {
    beforeCreate: (order, options) => {
      order.order_reference = `GL-${generateRandomUniqueNumber()}`;
    }
  }
});

const generateRandomUniqueNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

module.exports = Order