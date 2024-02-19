ordersRouter.post('/session', async (request, response) => {
    console.log('session')
  
    const { locale, order_amount, order_tax_amount, order_lines } = request.body
    const auth = Buffer.from(`${process.env.klarna_username}:${process.env.klarna_password}`).toString('base64')
  
    const resp = await fetch(
      `${process.env.klarna_url}/payments/v1/sessions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          acquiring_channel: 'ECOMMERCE',
          purchase_country: 'SE',
          purchase_currency: 'SEK',
          locale: 'sv-SE',
          order_amount,
          order_tax_amount,
          order_lines,
          intent: 'buy',
          merchant_urls: {
            authorization: 'https://example.com/authorization_callbacks'
          },
          shipping_options: [
            {
              id: "free",
              name: "Free Shipping",
              description: "Delivers in 5-7 days",
              promo: "",
              price: "0",
              tax_amount: "0",
              tax_rate: "0",
              shipping_method: "BoxUnreg",
              preselected: true
            },
            {
              id: "pickup",
              name: "Pick up at closest store",
              description: "",
              promo: "",
              price: "399",
              tax_amount: "30",
              tax_rate: "825",
              shipping_method: "PickUpStore"
            }
          ]
        })
      })
  
    console.log('resp');
    console.log(resp);
  
    let jsonResponse
    try {
      jsonResponse = await resp.json()
    } catch (error) {
      console.log(error);
    }
    console.log(jsonResponse);
  
    response.status(201).json(jsonResponse)
  })
  
  ordersRouter.post('/confirm', async (request, response) => {
  
    const { order_id } = request.body.queryKey[1]
    console.log(order_id);
  
    const auth = Buffer.from(`${process.env.klarna_username}:${process.env.klarna_password}`).toString('base64')
  
    const resp = await fetch(
      `${process.env.klarna_url}/checkout/v3/orders/${order_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        }
      }
    )
    console.log(resp)
    let body
    try {
      body = await resp.json()
  
    } catch (error) {
      console.log(error)
    }
    console.log(body);
  
    if (!body) {
      response.status(404).send('not found')
      console.log('returning')
      return
    }
  
    response.status(201).json(body)
  })
  
  ordersRouter.post('/update', async (request, response) => {
    const { locale, order_amount, order_tax_amount, order_lines, order_id } = request.body
    console.log(order_id);
  
    const auth = Buffer.from(`${process.env.klarna_username}:${process.env.klarna_password}`).toString('base64')
  
    const resp = await fetch(
      `${process.env.klarna_url}/payments/v1/sessions/${order_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          order_amount,
          order_tax_amount,
          order_lines,
          // shipping_options: [
          //   {
          //     id: "free",
          //     name: "Free Shipping",
          //     description: "Delivers in 5-7 days",
          //     promo: "",
          //     price: "0",
          //     tax_amount: "0",
          //     tax_rate: "0",
          //     shipping_method: "BoxUnreg",
          //     preselected: true
          //   },
          //   {
          //     id: "pickup",
          //     name: "Pick up at closest store",
          //     description: "",
          //     promo: "",
          //     price: "399",
          //     tax_amount: "30",
          //     tax_rate: "825",
          //     shipping_method: "PickUpStore"
          //   }
          // ]
        })
      })
  
    let body
    try {
      body = await resp.json()
    } catch (error) {
      console.log(error)
    }
    console.log(body);
  
    response.status(201).json(body)
  })
  
  // ordersRouter.post('/read/:order_id', async (request, response) => {
  
  //   const order_id = request.params.order_id
  //   console.log(order_id);
  
  
  //   const auth = Buffer.from(`${process.env.klarna_username}:${process.env.klarna_password}`).toString('base64')
  //   const resp = await fetch(
  //     `${process.env.klarna_url}/checkout/v3/orders/${order_id}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Basic ${auth}`
  //       },
  //       body: {}
  //     })
  
  //   let jsonResponse
  //   try {
  //     jsonResponse = await resp.json()
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log(jsonResponse);
  
  //   response.status(201).json(jsonResponse)
  
  // })
  
  // ordersRouter.post('/:order_id', async (request, response) => {
  
  //   const order_id = request.params.order_id
  //   const auth = Buffer.from(`${process.env.klarna_username}:${process.env.klarna_password}`).toString('base64')
  
  //   const resp = await fetch(
  //     `${process.env.klarna_url}/ordermanagement/v1/orders/${order_id}`,
  //     // `${process.env.klarna_url}/checkout/v3/orders/${order_id}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Basic ${auth}`
  //       }
  //     }
  //   )
  //   const body = await resp.json()
  //   console.log(body);
  
  //   const { order_lines, billing_address, status, order_amount, order_tax_amount, customer, initial_payment_method, fraud_status } = body
  //   console.log(status);
  //   if (!order_lines) response.status(404).json() // => Order not found?
  
  //   const [order, created] = await Order.findOrCreate({
  //     where: { externalId: order_id },
  //     defaults: {
  //       customer: customer.national_identification_number, initial_payment_method: initial_payment_method.type,
  //       fraud_status, ...billing_address, order_amount, order_tax_amount
  //     }
  //   })
  //   console.log('created: ' + created);
  
  //   const orderLines = order_lines.map(e => { return { ...e, orderId: order.id } })
  //   await OrderItem.bulkCreate(orderLines, { ignoreDuplicates: true })
  
  
  //   const acknowledgeResp = await fetch(
  //     `${process.env.klarna_url}/ordermanagement/v1/orders/${order_id}/acknowledge`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Basic ${auth}`
  //       }
  //     }
  //   )
  //   if (acknowledgeResp.status === 204) response.status(200).json()
  //   else response.status(400).json()
  
  // })