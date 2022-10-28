const User = require('../models/User')
const {getUserById}  = require('./UserController');

exports.changeUsd = async (req, res) => {
    const { userId } = req.params;
    const { action, amount } = req.body;
    if (action === 'withdraw') {
        const currentUser = await User.find({ _id: userId})
        const { usdBalance : currentBalance } = currentUser[0]
        if (amount > currentBalance) {
            return res.status(400).send({ message: 'Invalid Balance'})
        }
        await User.updateOne(
        { _id: userId }, 
        { $inc: {
            usdBalance: -amount
          }     
        });
    }
    if (action === 'deposit') {
        await User.updateOne(
        { _id: userId }, 
        { $inc: {
            usdBalance: amount
          }     
        });
    }
    try {
        return await getUserById(req, res)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}