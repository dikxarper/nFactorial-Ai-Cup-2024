const jwt = require("jsonwebtoken")

const generateAdminToken = (user) => {
    return jwt.sign({_id: user._id, role: 'admin'}, process.env.ADMIN_TOKEN_SECRET)
}
const generateUserToken = (user) => {
    return jwt.sign({_id: user._id, role: 'user'}, process.env.USER_TOKEN_SECRET)
}

const generateCompanyToken = (user) => {
    return jwt.sign({_id: user._id, role: 'company'}, process.env.USER_TOKEN_SECRET)
}

module.exports = {generateAdminToken, generateUserToken, generateCompanyToken}
