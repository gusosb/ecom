const categoriesRouter = require('express').Router()
const { auth } = require('./auth')
const { Variant, Image, Item, Category } = require('../models')

categoriesRouter.get('/', async (request, response) => {


  const currentUser = await auth(request)

  const categories = await Category.findAll({
    include: [
      {
        model: Category,
        as: 'SubOne',
        required: true,
        include: [
          { model: Category, as: 'SubTwo', include: [{ model: Item, include: [{ model: Image }, {model: Variant}] }] }
        ]
      },
    ]
  })

  response.json(categories)

})

categoriesRouter.get('/admin', async (request, response) => {
  const currentUser = await auth(request)

  const categories = await Category.findAll({
    include: [
      {
        model: Category,
        as: 'SubOne',
        required: true,
        include: [
          {
            model: Category, as: 'SubTwo', include: [{ model: Item, include: [{ model: Image }, { model: Variant }] }]
          }
        ]
      },
    ]
  })

  response.json(categories)

})

categoriesRouter.post('/admin', async (request, response) => {
  const { name, SubOneId, SubTwoId } = request.body
  if (SubOneId) {
    const topCategory = await Category.findByPk(SubOneId)
    const newCategory = await Category.create({ name })
    await topCategory.addSubOne(newCategory)
  } else if (SubTwoId) {
    const topCategory = await Category.findByPk(SubTwoId)
    const newCategory = await Category.create({ name })
    await topCategory.addSubTwo(newCategory)
  } else {
    const topCategory = await Category.create({ name })
    const newDummyCategory = await Category.create({ name: 'dummy' })
    await topCategory.addSubOne(newDummyCategory)
  }

  response.status(201).json()
})

module.exports = categoriesRouter