const express = require('express');
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
    res.render('admin/chatbot', {pageName: 'chatbot', role: "admin"});
})

router.get('/admin/verification', (req, res) => {
    res.render('admin/verification', {pageName: 'chatbot', role: "admin"});
});



module.exports = router