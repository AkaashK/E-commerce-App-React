const mongoose = require('mongoose')
const crypto = require('crypto')
const uuid = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    hashedpassword: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true})

userSchema.virtual('password')
    .get(function() {
        return this._password
    })
    .set(function(password){
        this._password = password,
        this.salt = uuid()
        this.hashedpassword = this.getSecurePassword(password)
    })

userSchema.methods = {

    authenticate: function(password) {
        return this.getSecurePassword(password) === this.hashedpassword
    },

    getSecurePassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex')
        } catch(error) {
            return ''
        }
    }
}

module.exports = mongoose.model('User', userSchema)