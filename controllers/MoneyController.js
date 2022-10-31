const User = require('../models/User')
const Bitcoin = require('../models/Bitcoin')

exports.changeUsd = async (req, res) => {
    const { userId } = req.params;
    const { action, amount } = req.body;
    if (action === 'withdraw') {
        const currentUser = await User.find({ _id: userId})
        const { usdBalance : currentBalance } = currentUser[0]
        if (amount > currentBalance) {
            return res.status(400).send({ message: 'Not Enough Balance'})
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
        const user = await User.findById(userId);
        return res.status(200).send(user)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.tradeBitcoin = async (req, res) => {
    const { userId } = req.params;
    const { action, amount } = req.body;
    const { price: bitcoinValue } = await Bitcoin.findOne()
    const currentUser = await User.find({ _id: userId})
    const { usdBalance : currentUSDBalance } = currentUser[0]
    const { bitcoinAmount : currentBCBalance } = currentUser[0]
    try {
    if (action === "buy") {
        if (currentUSDBalance < bitcoinValue * amount) {
            return res.status(400).send({ message: 'Not Enough USD Balance'})
        }
        const expense = amount * bitcoinValue
        await User.updateOne(
            { _id: userId }, 
            { $inc: {
                usdBalance: -expense,
                bitcoinAmount: amount
              }     
            }
        );
    }
    if (action === "sell") {
        if (currentBCBalance < amount) {
            return res.status(400).send({ message: 'Not Enough BC Balance'})
        }
        const profit = amount * bitcoinValue
        await User.updateOne(
            { _id: userId }, 
            { $inc: {
                usdBalance: profit,
                bitcoinAmount: -amount
              }     
            }
        );
    }
        const user = await User.findById(userId);
        return res.status(200).send(user)
    } catch {
        return res.status(400).send({ message: error.message })
    }
}