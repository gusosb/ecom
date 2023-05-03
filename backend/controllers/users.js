const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

usersRouter.post('/register', async (request, response) => {
  const { email, password } = request.body

  let user
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)
  try {
    user = await User.create({
      email,
      passwordHash,
    })
  } catch (error) {
    /*     throw new UserInputError(error.message, {
          invalidArgs: args,
        }) */
    console.log(error)
  }

  const userForToken = {
    email,
    id: user.id,
  }


  response.status(201).json({ token: jwt.sign(userForToken, process.env.SECRET) })

  //response.status(201).json(savedUser)
})

usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body


  const user = await User.findOne({ where: { email } })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPassword)) {
    /*     throw new UserInputError('wrong credentials') */
    console.log('error no user or incorrect password')
    response.json()
  }

  const userForToken = {
    email,
    id: user.id,
  }

  response.json({ token: jwt.sign(userForToken, process.env.SECRET) })
})

usersRouter.get('/', async (request, response) => {
  const { authorization } = request.headers
  console.log(authorization)

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    response.status(401)
  }

  const decodedToken = jwt.verify(
    authorization.substring(7), process.env.SECRET
  )

  const currentUser = await User.findByPk(decodedToken.id, {
    attributes: ['id']
  })

  if (!currentUser) {
    response.status(401)
  }

  const designers = await User.findAll({
    attributes: ['id', 'email', 'firstName', 'lastName'],
    /* attributes: { exclude: ['passwordHash'] }, */
    where: { isDesigner: true },
  })

  response.json(designers)
})

module.exports = usersRouter