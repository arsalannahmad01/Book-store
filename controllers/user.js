const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')

const register = async (req, res) => {
    const user = await User.create(req.body)

    const token = user.createJWT()
    res.status(201).json({ success: true, name: user.name, token: token })
}

const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email: email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT()
    res.status(201).json({ success: true, name: user.name, token: token })
}

module.exports = { register, login }