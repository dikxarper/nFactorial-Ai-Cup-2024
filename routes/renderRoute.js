const express = require('express');
const Company = require("../models/company-model");
const {verifyCompanyToken} = require("../middlewares/verify");
const controller = require('../controllers/renderController')
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('index', {pageName: 'index', role: "user"});
})

router.get('/profile', (req, res) => {
    res.render('profile/profile', {pageName: 'profile', role: "user"});
})

router.get('/auth/login', (req, res) => {
    res.render('auth/login', {pageName: 'login', role: "user"});
})

router.get('/auth/register', (req, res) => {
    res.render('auth/register', {pageName: 'register', role: "user"});
})

router.get("/doc-verify", (req, res) => {
    res.render("doc-verify", {pageName: "doc-verify", role: "user"});
})

router.get('/admin', (req, res) => {
    res.render('admin/chatbot', {pageName: 'admin/chatbot', role: "admin"});
})

router.get('/admin/verification', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET), async (req, res) => {
    const companyId = req.user._id;
    const company = await Company.findById(companyId)
    res.render('admin/verification', {pageName: 'admin/verification', role: "admin", company: company});
});

router.get('/:id/doc-verify', verifyCompanyToken(process.env.COMPANY_TOKEN_SECRET), async (req,res) => {
    const companyId = req.params.id
    const company = await Company.findById(companyId)
    res.render('doc-verify', {pageName: 'doc-verify', company, role: "admin"})
})


module.exports = router