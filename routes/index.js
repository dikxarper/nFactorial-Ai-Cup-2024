const express = require('express');
const router = express.Router();
// const fdb = require("../fdb/firebase").fdb;

router.use((req, res, next) => {
    next();
});

router.get('/', async (req, res) => {
    res.render('index', {pageName: 'index'});
})

module.exports = router