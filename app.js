const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./Utils/config')
const logger = require('./Utils/logger')
const expenseRouter = require('./controller/expense')
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')
const cors = require('cors')
const middleware = require('./Utils/middleware')
require('express-async-errors')

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MONGODB')
    })
    .catch(err => {
        logger.error('error connecting to MONGODB', err)
    })

app.use(cors())    
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.static('build'))


app.use('/api/expenses', expenseRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app