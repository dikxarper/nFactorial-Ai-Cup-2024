const Company = require('../models/company-model')
const request = require('request')
class CompanyController {
    
    async setToken(req,res) {
       
        const companyId = req.user._id
        const token = req.body.token
        try {
            await Company.findByIdAndUpdate(companyId, {telegramToken: token}, {new:true})
            console.log(token)
            var options = {
                'method': 'GET',
                'url': 'https://c1416.webapi.ai/integrfunc?action=tg_tokenSave&token='+token,
                'headers': {
                  'admin_id': '1',
                  'sk': 'a97825101d5e7e5a6208f3bc898ad5490e49018d',
                  'Cookie_1': 'value',
                  'Content-Type': 'application/json',
                  'Cookie': 'admin_id=1; sk=d79fc6f19363a65bb1c0c195940df2cb532113e5'
                },
                body: JSON.stringify({
                  "action": "login",
                  "instructions_value": "val"
                })
            }

            request(options, async function (error, response) {
                console.log(response)
                return res.status(200).json({ message: 'Updated' })
            });
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async getToken(req,res) {
       
        const companyId = req.user._id
        try {
           const company = await Company.findById(companyId)
           res.send({token: company.telegramToken})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async updateVerificationUrl(req,res) {
        const companyId = req.user._id
        const verificationRedirect = req.body.verificationRedirect
        try {
            await Company.findByIdAndUpdate(companyId, {verificationRedirect: verificationRedirect}, {new: true})
            res.status(200).json({message: "Verification Url Updated"})
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}

module.exports = new CompanyController()