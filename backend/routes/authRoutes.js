const router = require('express').Router
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

// register an user
router.post('/register', async (req, res) => {
  
})

module.exports = router