const mongoose = require('mongoose')

const user = new mongoose.Schema({
    password: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user', 'company'], default: 'user'},
    firstname: {type: String},
    lastname: {type: String},
    surname: {type: String},
    address: {type: String},
    city: {type: String},
    phone: {type: Number},
    isApproved: {type: Boolean, default: false},
    confirmToken: {type: String},
    chatId:{type: String},
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
}, {timestamps: true})

const User = mongoose.model('User', user)

module.exports = User