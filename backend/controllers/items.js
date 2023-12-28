const itemsRouter = require('express').Router()
const { auth } = require('./auth')
const multer = require('multer')
const { Item, Image, Variant, Review, Order } = require('../models')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the file
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })

itemsRouter.post('/', upload.single('file'), async (request, response) => {
  const { name, price, vatRateSE, image, categoryId } = request.body
  // const currentUser = await auth(request)
  const item = await Item.create({ name, price, vatRateSE, image, categoryId })
  await Image.create({ itemId: item.id, path: `/${request.file.destination}${request.file.filename}`, index: 0 })

  response.status(201).json()
})

itemsRouter.post('/image', upload.single('file'), async (request, response) => {
  // const currentUser = await auth(request)
  const { itemId, index } = request.body
  await Image.create({ itemId, path: `/${request.file.destination}${request.file.filename}`, index })

  response.status(201).json()
})


// => create review
itemsRouter.post('/reviews/:id', async (request, response) => {
  const itemId = request.params.id

  console.log(request.body);
  console.log(itemId);
  

  const order = await Order.findByPk(request.body.orderId)
  const name = order.given_name
  await Review.create({ itemId, ...request.body, name })

  response.status(201).json()
})


itemsRouter.post('/variant', async (request, response) => {
  // const currentUser = await auth(request)

  const { itemId, name, sellable } = request.body
  console.log(request.body);

  await Variant.create({ itemId, name, sellable })

  response.status(201).json()
})

itemsRouter.put('/variant/:id', async (request, response) => {
  console.log('variant!');

  const [item, isCreated] = await Variant.upsert({
    ...request.body
  });

  response.status(201).json()
})

itemsRouter.put('/status/:id', async (request, response) => {
  const id = request.params.id
  const item = await Item.findByPk(id)

  item.set({
    isActive: !item.isActive
  })
  item.save()

  response.status(201).json()
})

itemsRouter.put('/:id', async (request, response) => {
  const [item, created] = await Item.upsert({
    ...request.body
  });

  response.status(201).json()
})

itemsRouter.delete('/image/:id', async (request, response) => {
  console.log(request.params)
  const id = request.params.id
  const image = await Image.findByPk(id)
  await image.destroy()

  response.status(201).json()
})

module.exports = itemsRouter