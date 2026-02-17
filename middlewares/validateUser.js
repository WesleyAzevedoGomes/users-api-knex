const utilMessages = require("../utils/utilMessages")
const httpStatus = require("../utils/httpStatus")

module.exports = (req, res, next) => {
    const { name, email, password } = req.body
    const errors = []

    if (!name) errors.push({ field: 'name', message: utilMessages.AUTH.MISSING_NAME })
    if (!email) errors.push({ field: 'email', message: utilMessages.AUTH.MISSING_EMAIL })
    if (!password) errors.push({ field: 'password', message: utilMessages.AUTH.MISSING_PASSWORD })

    if (errors.length > 0) {
        return res.status(httpStatus.FORBIDDEN).json({
            success: false,
            errors
        })
    }
    next()
}