const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

const userController = require('../controllers/user')

router.post('/login', userController.loginController)

router.post('/register', userController.registerController)

router.post('/', authenticate, userController.getAllUser)

module.exports = router