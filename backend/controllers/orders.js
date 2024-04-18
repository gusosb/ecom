const ordersRouter = require('express').Router()
const { auth } = require('./auth')
const { Order, OrderItem } = require('../models')

const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

const stripe = require("stripe")(process.env.STRIPE_KEY);


ordersRouter.get('/admin', async (request, response) => {

  const currentUser = await auth(request) || [];
  if (!currentUser.isAdmin) return response.status(401).end();

  const orders = await Order.findAll({ include: [{ model: OrderItem }] });
  response.json(orders);
})

ordersRouter.put('/admin/tracking/:id', async (request, response) => {

  const currentUser = await auth(request) || [];
  if (!currentUser.isAdmin) return response.status(401).end();

  const orderID = request.params.id;

  const { tracking } = request.body;

  const order = await Order.findByPk(orderID);
  order.set({
    tracking,
    isFulfilled: true
  });
  await order.save();

  response.status(200).json();
})

// STRIPE

ordersRouter.post('/create-payment-intent', async (request, response) => {
  const { locale, order_amount, order_tax_amount, order_lines,
    email, phone, firstname, lastname, address, postalcode, city, currency
  } = request.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order_amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  console.log('paymentIntent.client_secret', paymentIntent.client_secret);


  response.send({ clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id });
});


ordersRouter.post('/createorder', async (request, response) => {

  const { locale, order_amount, order_tax_amount, order_lines,
    email, phone, name, address, postalcode, city, order_reference, payment_id, currency
  } = request.body;

  console.log('order_reference', order_reference);

  const [order, created] = await Order.findOrCreate({
    where: { externalId: order_reference },
    defaults: {
      order_amount, order_tax_amount, externalId: order_reference,
      email, phone, name, address, postalcode, city, payment_id, currency
    }
  });
  console.log('created: ' + created);
  if (!created) {
    await OrderItem.destroy({
      where: {
        orderId: order.id
      },
    });
  }
  console.log('order: ' + order);

  const orderLines = order_lines.map(e => { return { ...e, orderId: order.id } });
  await OrderItem.bulkCreate(orderLines, { ignoreDuplicates: true });

  response.status(201).json();
});

ordersRouter.post('/update-payment-intent', async (request, response) => {

  const { locale, order_amount, order_tax_amount, order_lines,
    email, phone, name, address, postalcode, city, order_reference, payment_id, currency
  } = request.body;


  const paymentIntent = await stripe.paymentIntents.update(
    payment_id,
    {
      currency,
      amount: order_amount
    }
  );

  console.log('paymentIntent', paymentIntent);
  response.status(201).json();
});


ordersRouter.post('/checkpayment', async (request, response) => {
  const { order_reference } = request.body;

  console.log('checkpayment - order_reference', order_reference);

  const order = await Order.findOne({ where: { externalId: order_reference }, include: [{ model: OrderItem }] });
  console.log('checkpayment - order', order);


  response.status(201).json(order);
});

ordersRouter.post('/webhook-receiver', async (request, response) => {
  const { data, type } = request.body;

  const externalId = data.object.client_secret;

  const order = await Order.findOne({ where: { externalId } });
  console.log(order);

  if (type !== 'payment_intent.succeeded') return response.status(200).json();

  order.is_paid = true;
  await order.save();

  response.status(201).json();
});



module.exports = ordersRouter;