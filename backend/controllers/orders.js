const ordersRouter = require('express').Router()
const Order = require('../models/order')
const { auth } = require('./auth')

ordersRouter.get('/', async (request, response) => {

  const currentUser = await auth(request)
  /*   response.json() */
  if (!currentUser) {
    response.status(404).end()
    return
  }

  const orders = Order.findAll({
    where: {
      userId: currentUser.id
    }
  })

  response.json(orders)


})


module.exports = ordersRouter