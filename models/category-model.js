const mongoose = require('mongoose')

const category = new mongoose.Schema({
    name: {type: String}
}, {timestamps: true})

const Category = mongoose.model('Category', category)

module.exports = Category