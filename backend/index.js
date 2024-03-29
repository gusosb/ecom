const express = require('express')
const app = express()
const cors = require('cors')

const usersRouter = require('./controllers/users')
const siteRouter = require('./controllers/site')
const categoriesRouter = require('./controllers/categories')
const ordersRouter = require('./controllers/orders')
const itemsRouter = require('./controllers/items')

const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')


app.use(express.json())


app.use(cors())

// app.use(cors({
//     origin: 'https://ecom.kanindev.se',
// }));

app.options('*', cors())

app.use('/api/orders', ordersRouter)
app.use('/api/users', usersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/items', itemsRouter)
/* app.use('/api/site', siteRouter) */


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})