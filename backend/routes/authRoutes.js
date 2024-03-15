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

  console.log(passwordHash)
})

module.exports = router