const mongoose = require('mongoose')

const source = new mongoose.Schema({
    url: {type: String},
    content: {type: String, required: true},
    title: {type: String, required: true},
    webapi_id: {type: String},
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
}, {timestamps: true})

const Source = mongoose.model('Source', source)

module.exports = Source