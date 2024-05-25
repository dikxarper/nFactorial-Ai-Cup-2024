const User = require('../models/user-model')
class UserController {
    async confirmRegistration(req,res) {
        const {email, token:randomString} = req.params
        try{
            const user = await User.findOne({email})
            if (!user) return res.status(404).json({ message: "User not found" })
            if (user.confirmToken!==randomString) return res.status(404).json({ message:"Confirm token is invalid" })
            user.isApproved = true
            user.confirmToken = null
            await user.save()
            res.redirect(302,'/login')
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new UserController()