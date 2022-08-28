require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const usersRouter = require('./routes/user')
const booksRouter = require('./routes/book')

const authMiddleware = require('./middleware/authentication')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())


app.use('/api/v1/users', usersRouter)
app.use('/api/v1/books', authMiddleware, booksRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Database connection established...')
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(`Error connecting to db: ${error}`)
    }
}

start()