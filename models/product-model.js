const mongoose = require('mongoose')

const product = new mongoose.Schema({
    uuid: {type: String},
    name: {type: String},
    description: {type: String},
    features: {type: String},
    price: {type: String},
    category: {type: String},
    file: {type: Array},
    rating: {type: String},
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }
}, {timestamps: true})

const Product = mongoose.model('Product', product)

module.exports = Product