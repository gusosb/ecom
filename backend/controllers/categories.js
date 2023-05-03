const categoriesRouter = require('express').Router()
const Category = require('../models/category')
const Item = require('../models/item')
const { auth } = require('./auth')

categoriesRouter.get('/', async (request, response) => {


  const currentUser = await auth(request)
  console.log(currentUser)

  const categories = await Category.findAll({
    include: [
      {
        model: Category,
        as: 'SubOne',
        required: true,
        include: [
          { model: Category, as: 'SubTwo', include: [{ model: Item }] }
        ]
      },
    ]
  })

  response.json(categories)

})

categoriesRouter.post('/', async (request, response) => {
  const { name, SubOneId, SubTwoId } = request.body
  console.log(request)
  if (SubOneId) {
    const topCategory = await Category.findByPk(SubOneId)
    const newCategory = await Category.create({ name })
    await topCategory.addSubOne(newCategory)
  } else if (SubTwoId) {
    const topCategory = await Category.findByPk(SubTwoId)
    const newCategory = await Category.create({ name })
    await topCategory.addSubTwo(newCategory)
  } else {
    await Category.create({ name })
  }

  response.status(201).json()
})

module.exports = categoriesRouter