const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')

router.post('/signup',[
    check('name', 'name should be atleast three characters').isLength({min: 3}),
    check('email', 'email is required').isEmail(),
    check('password', 'password must have atleast 8 characters').isLength({min: 8})
], signup)

router.post('/signin',[
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({min: 1})
], signin)

router.get('/signout', signout)

module.exports = router

