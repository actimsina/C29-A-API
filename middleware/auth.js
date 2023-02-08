const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    if (!req.headers.authorization) {
        let err = new Error('Authorization token missing.')
        res.status(401)
        return next(err)
    }
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return next(err)
        console.log(decoded)
        req.user = decoded
        next()
    })
}

const verifyAdmin = (req, res, next) => {
    if (req.user.role != 'Admin') {
        let err = new Error('You are not authorized.')
        res.status(403)
        return next(err)
    }
    next()
}

module.exports = { verifyUser, verifyAdmin }