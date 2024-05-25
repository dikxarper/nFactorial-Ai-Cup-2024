const express = require('express')
const router = express.Router()
const Controller = require('../controllers/auth-controller')

// done
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/logout', Controller.logout)

module.exports = router