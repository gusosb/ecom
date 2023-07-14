const ordersRouter = require('express').Router()
const { auth } = require('./auth')
const { Order } = require('../models')

ordersRouter.get('/admin', async (request, response) => {

  // const currentUser = await auth(request)
  // /*   response.json() */
  // if (!currentUser) {
  //   response.status(404).end()
  //   return
  // }

  const orders = Order.findAll()

  response.json(orders)

})


// ordersRouter.get('/orders', async (request, response) => {

//   const currentUser = await auth(request)
//   /*   response.json() */
//   if (!currentUser) {
//     response.status(404).end()
//     return
//   }

//   const orders = Order.findAll({
//     where: {
//       userId: currentUser.id
//     }
//   })

//   response.json(orders)


// })


module.exports = ordersRouter