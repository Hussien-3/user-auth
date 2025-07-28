const {body} = require('express-validator')

const validatorLogin = () => {
    return [
        body('email').notEmpty().withMessage('email is empty'),
        body('password').notEmpty().withMessage('password is empty')
    ]
}

const validatorRegsteir = () => {
    return [
        body('email').notEmpty().withMessage('email is empty'),
        body('password').notEmpty().withMessage('password is empty')
    ]
}

module.exports = {
    validatorRegsteir,
    validatorLogin
}