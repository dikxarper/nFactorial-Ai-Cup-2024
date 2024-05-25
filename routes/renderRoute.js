const express = require('express');
const router = express.Router();
// const fdb = require("../fdb/firebase").fdb;

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('index', {pageName: 'index'});
})

router.get('/product', (req, res) => {
    res.render('product', {pageName: 'product'});
})

router.get('/profile', (req, res) => {
    res.render('profile/profile', {pageName: 'profile'});
})

router.get('/profile-confirm', (req, res) => {
    res.render('profile/profile-confirm', {pageName: 'profile'});
})

router.get('/auth/login', (req, res) => {
    res.render('auth/login', {pageName: 'login'});
})

router.get('/auth/register', (req, res) => {
    res.render('auth/register', {pageName: 'register'});
})

module.exports = router