const mongoose = require('mongoose')

const company = new mongoose.Schema({
    password: {type: String, required: true},
    email: {type: String, required: true},
    url: {type: String, required: true},
    isApproved: {type: Boolean, default: false},
    sources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Source'
        }],
    verificationRedirect: {type: String},
    telegramToken: {type: String}
}, {timestamps: true})

const Company = mongoose.model('Company', company)

module.exports = Company