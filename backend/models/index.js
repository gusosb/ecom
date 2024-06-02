const User = require('./user');
const Site = require('./site');
const Category = require('./category');
const Item = require('./item');
const Image = require('./image');
const Order = require('./order');
const OrderItem = require('./orderitem');
const Variant = require('./variant');
const Review = require('./review');
const Notification = require('./notification');

const { sequelize } = require('../util/db');

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Category.belongsToMany(Category, { as: 'SubOne', through: 'CategorySubOne' });
Category.belongsToMany(Category, { as: 'SubTwo', through: 'CategorySubTwo' });

Category.hasMany(Item);
Item.belongsTo(Category);

Item.hasMany(Image);
Image.belongsTo(Item);

Item.hasMany(Variant);
Variant.belongsTo(Item);

Item.hasMany(Review);
Review.belongsTo(Item);

Notification.belongsTo(Variant);
Item.hasMany(Variant);

// sequelize.sync()
sequelize.sync({ alter: true });

module.exports = {
  User,
  Site,
  Category,
  Item,
  Order,
  OrderItem,
  Image,
  Variant,
  Review,
  Notification
};
