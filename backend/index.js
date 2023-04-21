const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')



app.use(express.json())


app.use(cors())

app.use('/api/users', usersRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})