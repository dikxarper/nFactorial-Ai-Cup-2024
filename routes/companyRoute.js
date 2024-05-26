const express = require('express')
const router = express.Router()
const Controller = require('../controllers/company-controller')
const {verifyCompanyToken} = require("../middlewares/verify")

router.post('/instruction/update', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET), Controller.addInstruction)

module.exports = router