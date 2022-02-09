const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.json({ 
                error: err
            })
        }
        let user= new User({
            email:req.body.email,
            password:hash
        })
        user.save()
            .then(result => {
                res.status(200).json({ message: 'User Created successfully',
                user:result
                })
            })
            .catch(error=> {
                res.json({
                    error
                })
            })
        })
}

const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ email})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.json({
                            message:'Error Occoured'
                        })
                    }
                    if(result) {

                        let token = jwt.sign ({email:user.email, _id: user._id}, 'SECRET', {
                            expiresIn: '2h'
                        })

                        res.json({
                            message: 'Login successfull',
                            token
                        })
                    } else {
                        res.json({
                            message: 'Login failed, Password does not match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'User Not Found'
                })

            }
        })
}


const getAllUser = (req, res, next) => {
    User.find()
        .then(users => {
            res.json({
                users
            })
        })
        .catch(error=> {
            res.json({
                error
            })
        })
}


module.exports = {
    registerController,
    loginController,
    getAllUser
}