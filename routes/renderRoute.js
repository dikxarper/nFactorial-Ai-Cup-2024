const express = require('express');
const router = express.Router();
// const fdb = require("../fdb/firebase").fdb;

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('index', {pageName: 'index', role: "user"});
})

router.get('/product', (req, res) => {
    res.render('product', {pageName: 'product', role: "user"});
})

router.get('/profile', (req, res) => {
    res.render('profile/profile', {pageName: 'profile', role: "user"});
})

router.get('/profile-confirm', (req, res) => {
    res.render('profile/profile-confirm', {pageName: 'profile', role: "user"});
})

router.get('/auth/login', (req, res) => {
    res.render('auth/login', {pageName: 'login', role: "user"});
})

router.get('/auth/register', (req, res) => {
    res.render('auth/register', {pageName: 'register', role: "user"});
})

router.get('/admin/users', (req, res) => {
    res.render('admin/admin-users', {pageName: 'admin-users', role: "admin"});
})

router.get('/admin/products', (req, res) => {
    res.render('admin/admin-products', {pageName: 'admin-products', role: "admin"});
})

router.get('/admin/categories', (req, res) => {
    res.render('admin/admin-categories', {pageName: 'admin-categories', role: "admin"});
})

module.exports = router