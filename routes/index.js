const express = require('express')
const router = express.Router();
const UserController = require('../controllers/UserController');
const BitcoinController = require('../controllers/BitcoinController');
const MoneyController = require('../controllers/MoneyController');

module.exports = (app) => {
   router.route('/users/:id')
     .get(UserController.getUserById)
     .put(UserController.updateUserById)

   router.post('/users', UserController.addUser)
   router.post('/users/:userId/usd', MoneyController.changeUsd)

   router.route('/bitcoin')
     .get(BitcoinController.getBitcoin)
     .put(BitcoinController.updateBitcoin)

   app.use('/', router)
}