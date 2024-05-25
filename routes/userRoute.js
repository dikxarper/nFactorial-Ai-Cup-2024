const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user-controller')

// not tested
router.get('/confirm-registration/:email/:token', Controller.confirmRegistration)

module.exports = router