const crypto = require("crypto")
const bcrypt = require("bcrypt")
const User = require("../models/user-model")
const {generateAdminToken, generateUserToken, generateCompanyToken} = require('../middlewares/token')

class AuthController {
    generateToken(user, role) {
        switch (role) {
            case 'admin':
                return generateAdminToken(user)
            case 'user':
                return generateUserToken(user)
            case 'company':
                return generateCompanyToken(user)
            default:
                throw new Error('Invalid role')
        }
    }

    handleLoginSuccess(res, token, role, userId) {
        res.cookie(role, token, {
            maxAge: process.env.TOKEN_EXPIRE * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })
        res.status(200).json({message: "Login successful", id: userId, role: role})
    }

    login = async (req, res) => {
        const {email, password} = req.body

        try {

            const user = await User.findOne({email})
            if (!user) return res.status(400).json({message: "Incorrect email or password"})

            const userId = user._id

            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {

                // if (user.isApproved !== true) return res.status(403).json({message: "Confirm your account"})

                const token = this.generateToken(user, user.role)

                return this.handleLoginSuccess(res, token, user.role, userId)
            }
            return res.status(404).json({message: "Incorrect email or password"})
        } catch (err) {
            console.log(err.message)
            res.status(500).json({message: "Internal server error"})
        }
    }

    async register(req, res) {
        const {email, password} = req.body
        const emailExist = await User.findOne({email})
        if (emailExist) return res.status(400).json({message: "Email already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const randomString = crypto.randomBytes(20).toString('hex')

        const user = new User({
            email,
            password: hashedPassword,
        })
        const message = {
            from: 'Approve your email <mereke.diasov@mail.ru>',
            to: user.email,
            subject: 'Approve email',
            text: `Congrats with registration at our website!
        Approve your email with this URL http://localhost:${process.env.PORT}/api/user/confirm-registration/${email}/${randomString}`
        }
        try {
            user.confirmToken = randomString
            await user.save()
            // mailer(message)
            res.status(200).json({message: "User registered successfully"})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('admin')
            res.clearCookie('user')
            res.clearCookie('company')
            return res.status(200).json({message: "User logged out successfully"})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }

    // async loginGoogle(req, res) {
    //     try {
    //         if (req.user) {
    //             return res.redirect('/')
    //         }
    //         passport.authenticate('google', {scope: ['profile', 'email']})(req, res, next)
    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).send('Internal Server Error')
    //     }
    // }
    //
    // async registerGoogle(req, res) {
    //     try {
    //         if (req.user) {
    //             return res.redirect('/')
    //         }
    //
    //         passport.authenticate('google', {scope: ['profile', 'email']})(req, res, next)
    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).send('Internal Server Error')
    //     }
    // }
    //
    // async logoutGoogle(req, res) {
    //     req.logout()
    //     res.redirect('/')
    // }
}

module.exports = new AuthController()