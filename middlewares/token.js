const jwt = require("jsonwebtoken")

const generateCompanyToken = (company) => {
    return jwt.sign({_id: company._id, url: company.url, name: company.name}, process.env.COMPANY_TOKEN_SECRET)
}

module.exports = {generateCompanyToken}
