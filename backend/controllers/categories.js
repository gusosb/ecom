const categoriesRouter = require('express').Router()
const { auth } = require('./auth')
const { Variant, Image, Item, Category, Review } = require('../models')

categoriesRouter.get('/', async (request, response) => {


  const currentUser = await auth(request)

  const categories = await Category.findAll({
    include: [
      {
        model: Category,
        as: 'SubOne',
        required: true,
        include: [
          { model: Category, as: 'SubTwo', include: [{ model: Item, where: { isActive: true }, include: [{ model: Image }, { model: Variant }, { model: Review }] }] }
        ]
      },
    ]
  })
  response.json(categories)
})


categoriesRouter.get('/new', async (request, response) => {
  const categories = await Category.findAll({
    include: [{
      model: Item,
      where: { isActive: true },
      include: [
        { model: Image },
        { model: Variant },
        { model: Review }
      ]
    }]
  });

  response.json(categories);
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
            model: Category, as: 'SubTwo', include: [{
              model: Item,
              include: [{ model: Image }, { model: Variant }, { model: Review }]
            }]
          }]
      },
    ]
  })

  response.json(categories)
})

categoriesRouter.get('/admin/new', async (request, response) => {
  const currentUser = await auth(request)

  const categories = await Category.findAll({
    include: [
      { model: Item, include: [{ model: Image }, { model: Variant }, { model: Review }] },
    ]
  })

  console.log('categories admin new', categories);


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

categoriesRouter.put('/admin/name', async (request, response) => {
  const currentUser = await auth(request)
  console.log(currentUser);

  const { name, id } = request.body

  const category = await Category.findByPk(id)

  category.set({ name })
  category.save()

  response.status(201).json()
})


categoriesRouter.put('/admin', async (request, response) => {
  const [instance, created] = await Category.upsert({ ...request.body });
  console.log(instance);
  console.log(created);


  response.status(201).json()
})

module.exports = categoriesRouter