const jwt = require('jsonwebtoken')

const verifyCompanyToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['company']
    if (!token) return res.status(403).json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(404).json({message: "No token"})

        const {_id, name, url} = decoded
        req.user = {_id, name, url}
        next()
    })
}

module.exports = {verifyCompanyToken}