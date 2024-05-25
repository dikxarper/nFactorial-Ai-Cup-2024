const jwt = require('jsonwebtoken')

const verifyAdminToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['admin']
    if (!token) return res.status(403).json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(404).json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}

const verifyUserToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['user']
    if (!token) return res.status(403).json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(404).json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
            next()
    })
}

const verifyCompanyToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['company']
    if (!token) return res.status(403).json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(404).json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}

module.exports = {verifyAdminToken, verifyUserToken, verifyCompanyToken}