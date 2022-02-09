const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/contacts-db');

const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database connection established')
})

const contactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000


app.use('/api/contacts', contactRoute)
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})


app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`)
})

const contacts = [
    {name: 'John', email: 'john@gmail.com'},
    {name: 'Moozahid', email: 'mozahid@gmail.com'},
    {name: 'Salvi', email: 'example@gmail.com'},
    {name: 'Dona', email: 'dona@gmail.com'}
]