const mongoose = require('mongoose')
const valid = require('validator')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: 'string',
        trim: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            messages: `{VALUE} is not a valid email address`
        }
    },
    password: 'string'
})

const User = mongoose.model('User', UserSchema)
module.exports = User