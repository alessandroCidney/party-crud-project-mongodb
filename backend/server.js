// modules
const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const cors = require('cors')

// routes
const authRouter = require('./routes/authRoutes.js')

// middlewares

// config

const dbName = 'partytimeb'
const port = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/auth', authRouter)

// mongodb connection

mongoose.connect(
  `mongodb://localhost/${dbName}`,
  {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  },
)

app.get('/', (req, res) => {
  res.json({
    message: 'Rota teste!'
  })
})

app.listen(port, () => {
  console.log(`O backend está rodando na porta ${port}`)
})