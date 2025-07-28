const jwt = require('jsonwebtoken')
const appError = require('../utils/app-error')
const jsend = require('../utils/status-text')

module.exports = async(req, res, next) => {
    const auyhHeader = req.cookies.token

    if (!auyhHeader) {
        return res.redirect('/account/')
    }

try {
    const verfiy = await jwt.verify(auyhHeader, process.env.JWT_SECRYT_KEY)

    req.verfiy = verfiy

    next();
} catch (error) {
    res.redirect('/account/')
}}