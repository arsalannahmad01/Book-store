const express = require('express')
const { route } = require('express/lib/router')
const router = express.Router()

const {register, login} = require('../controllers/user')

router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router