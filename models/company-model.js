const mongoose = require('mongoose')

const company = new mongoose.Schema({
    name: {type: String, required: true},
    location: [{
        city: {type: String},
        address: {type: String}
    }],
    phone: {type: Number},
    email: {type: String},
    description: {type: String},
    isApproved: {type:Boolean, default:false},
    rating: {type: String},
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
}, {timestamps: true})

const Company = mongoose.model('Company', company)

module.exports = Company