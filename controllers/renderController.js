const crypto = require('crypto')
const Company = require('../models/company-model')
class RenderController {
    async verificationToken(req,res) {
        const companyId = req.user._id
        const randomString = crypto.randomBytes(20).toString('hex')
        try {
            await Company.findByIdAndUpdate(companyId, {verificationToken: randomString}, {new:true})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}

module.exports = new RenderController()