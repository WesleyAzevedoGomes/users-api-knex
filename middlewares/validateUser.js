const errorMessages = require("../utils/errorMessages")
const httpStatus = require("../utils/httpStatus")

module.exports = (req, res, next) => {
    const { name, email, password } = req.body
    const errors = []

    if (!name) errors.push({ field: 'name', message: errorMessages.AUTH.MISSING_NAME })
    if (!email) errors.push({ field: 'email', message: errorMessages.AUTH.MISSING_EMAIL })
    if (!password) errors.push({ field: 'password', message: errorMessages.AUTH.MISSING_PASSWORD })

    if (errors.length > 0) {
        return res.status(httpStatus.FORBIDDEN).json({
            success: false,
            errors
        })
    }
    next()
}