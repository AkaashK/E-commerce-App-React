require('dotenv').config()

const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    const user = new User(req.body)
    user.save((error, user) => {
        if(error) {
            return res.status(400).json({
                error: "Not able to save user in Database"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}


exports.signin = (req, res) => {
    const { email, password } = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    User.findOne({email}, (error, user) => {
        if(error) {
            return res.status(400).json({
                error: 'Something went wrong'
            })
        } 
        
        if(!user) {
            return res.status(401).json({
                error: 'User email does not exists'
            })
        }

        if(!user.authenticate(password)) {
            res.status(401).json({
                error: 'Email and password does not match'
            })
        }

        //create token
        const token = jwt.sign({_id: user.id}, process.env.SECRET_JWT)

        //send token as cookie
        res.cookie('token', token, {expire: new Date() + 9000})

        //send response to frontend
        const { _id, name, email, role } = user

        return res.json({ token, user: { _id, name, email, role }})
    })
}


//signout Controller
exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'User signed out..'
    })
}

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET_JWT,
    userProperty: 'auth'
})

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker) {
        return res.status(403).json({
            error: 'Access Denied..!'
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: 'You are not an Admin..!'
        })
    }
    next()
}

