const siteRouter = require('express').Router()
const { Site } = require('../models')

siteRouter.get('/', async (request, response) => {

     response.json('site!')

    /*response.status(404).end() */

})



module.exports = siteRouter