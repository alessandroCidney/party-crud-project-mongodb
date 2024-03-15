const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

// register an user
router.post('/register', async (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const confirmpassword = req.body.confirmpassword

  // Check for required fields
  if ([name, email, password, confirmpassword].some(i => !i)) {
    return res.status(400).json({
      error: 'Por favor, preencha todos os campos!',
    })
  }

  // Check if passwords match
  if (password !== confirmpassword) {
    return res.status(400).json({
      error: 'As senhas não conferem!',
    })
  }

  // Check if user exists
  const emailExists = await User.findOne({ email })

  if (emailExists) {
    return res.status(400).json({
      error: 'O email informado já está em uso!',
    })
  }

  // Create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({ name, email, password: passwordHash })

  try {
    const newUser = await user.save()

    // Create token
    const token = jwt.sign(
      // payload
      {
        name: newUser.name,
        id: newUser._id,
      },
      'testsecret',
    )

    res.json({
      error: null,
      msg: 'Você realizou o cadastro com sucesso!',
      token,
      userId: newUser._id,
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

// login an user
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  // Check if user exists
  const user = await User.findOne({ email })

  if (!user) {
    res.status(400).json({
      error: 'Não há um usuário cadastrado com este e-mail!',
    })
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    res.status(400).json({
      error: 'Senha incorreta!',
    })
  }

  try {
    // Create token
    const token = jwt.sign(
      // payload
      {
        name: user.name,
        id: user._id,
      },
      'testsecret',
    )

    res.json({
      error: null,
      msg: 'Você está autenticado!',
      token,
      userId: user._id,
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router