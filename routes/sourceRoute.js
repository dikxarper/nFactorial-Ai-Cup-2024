const express = require('express')
const router = express.Router()
const Controller = require('../controllers/source-controller')
const {verifyCompanyToken} = require("../middlewares/verify")

router.get('/', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET),Controller.getSources)
router.get('/:id', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET),Controller.getSourceById)
router.post('/create', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET),Controller.createSource)
router.post('/update/:id', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET),Controller.updateSource)
router.post('/delete/:id', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET),Controller.deleteSource)

module.exports = router