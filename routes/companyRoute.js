const express = require('express')
const router = express.Router()
const Controller = require('../controllers/company-controller')
const {verifyCompanyToken} = require("../middlewares/verify")

router.post('/telegram/update', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET), Controller.setToken)
router.post('/telegram/get', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET), Controller.getToken)
router.post('/verificationUrl/update', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET), Controller.updateVerificationUrl)


module.exports = router