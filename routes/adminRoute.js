const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin-controller')

// not tested
router.get('/users', AdminController.getAllUsers)
router.get('/products', AdminController.getAllProducts)
router.get('/companies', AdminController.getAllCompanies)
router.get('/categories', AdminController.getAllCategories)

module.exports = router