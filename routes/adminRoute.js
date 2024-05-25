const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin-controller')

// not tested
router.get('/users', AdminController.getAllUsers)

router.get('/products', AdminController.getAllProducts)
router.get('/category/:id/products', AdminController.getProductsByCategory)
router.get('/company/:id/products', AdminController.getProductsByCompany)

router.get('/companies', AdminController.getAllCompanies)


router.post('/category/create', AdminController.createCategory)
router.get('/categories', AdminController.getAllCategories)
router.post('/category/:id/update', AdminController.updateCategory)
router.post('/category/:id/delete', AdminController.deleteCategory)

module.exports = router