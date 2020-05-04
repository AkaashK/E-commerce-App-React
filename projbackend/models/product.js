const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    productinfo: {
        type: String,
        trim: true,
        maxlength: 3000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    photo: {
        data: Buffer,
        contentType:String
    }
}, {timestamps: true})

module.exports = mongoose.model('product', productSchema)