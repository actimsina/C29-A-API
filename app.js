require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const booksRouter = require('./routes/books-router')
const categoryRouter = require('./routes/category-router')
const userRouter = require('./routes/user-router')
const profileRouter = require('./routes/profile_routes')
const auth = require('./middleware/auth')
const app = express()

app.use(cors())
// Connect to MongoDB
const DB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URI
    : process.env.DB_URI
console.log(DB_URI)
mongoose.set('strictQuery', true)
mongoose.connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB Database Server')
    }).catch((err) => console.log(err))

// 1. Application level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})


// 3. In-built middleware
app.use(express.json())

// 2. Router level middleware
app.use('/users', userRouter)
app.use(auth.verifyUser)
app.use('/profile', profileRouter)
app.use('/books', booksRouter)
app.use('/categories', categoryRouter)

// 4. Error Handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({ 'err': err.message })
})

module.exports = app