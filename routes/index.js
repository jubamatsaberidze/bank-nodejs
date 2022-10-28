const express = require('express')
const router = express.Router();
const UserController = require('../controllers/UserController')

module.exports = (app) => {
   router.route('/users/:id')
     .get(UserController.getUserById)

   router.post('/users', UserController.addUser)

   app.use('/', router)
}