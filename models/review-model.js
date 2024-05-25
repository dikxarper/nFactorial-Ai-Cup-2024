const mongoose = require('mongoose')

const review = new mongoose.Schema({
    text: {type: String},
    rating: {type: String},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Review = mongoose.model('Review', review)

module.exports = Review