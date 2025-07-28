const jsend = require('../utils/status-text')
const apperorr = require('../utils/app-error')

module.exports = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.verfiy.role)) {
            const data = apperorr.create(jsend.fail, 404, 'you not valiad to show this')
            return next(data)
        }

        next();
    }
}