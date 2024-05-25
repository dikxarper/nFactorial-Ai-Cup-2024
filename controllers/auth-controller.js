const bcrypt = require("bcrypt")
const Company = require("../models/company-model")
const {generateCompanyToken} = require('../middlewares/token')

class AuthController {

    async login(req, res) {
        const {email, password} = req.body

        try {
            const company = await Company.findOne({email})
            if (!company) return res.status(400).json({message: "Incorrect email"})

            const validationPassword = await bcrypt.compare(password, company.password)
            if (!validationPassword) return res.status(400).json({message: "Incorrect password"})

            const token = generateCompanyToken(company)
            res.cookie('company', token, {maxAge: process.env.TOKEN_EXPIRE * 500})

            res.status(200).json({message: "Company logged in successfully"})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async register(req, res) {
        const {email, password, url, name} = req.body
        const emailExist = await Company.findOne({email})
        if (emailExist) return res.status(400).json({message: "Email already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const company = new Company({
            email,
            password: hashedPassword,
            url,
            name
        })
        try {
            await company.save()
            res.status(200).json({message: "Company registered successfully"})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('company')
            return res.status(200).json({message: "Company logged out successfully"})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

}

module.exports = new AuthController()