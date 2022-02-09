const mongoose = require('mongoose')
const valid = require('validator')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name: {
        type: 'string',
        trim: true,
        required: true,
        minlength: 3
        //trim for extra space, given by user
    },
    phone: {
        type: 'string',
        trim: true,
        required: true,
        minlength: 11,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            messages: `{VALUE} is not a valid email address`
        }
    }
})

const Contact = mongoose.model('contact', ContactSchema)

module.exports = Contact