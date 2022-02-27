const express = require('express')
const router = express.Router()
const passport = require('../../../config/passport')
const adminController = require('../../../controllers/apis/admin-controllers')

router.post('/signin', passport.authenticate('local', { session: false }), adminController.signIn)

module.exports = router
