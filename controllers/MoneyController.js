const User = require('../models/User')
const Bitcoin = require('../models/Bitcoin')

exports.changeUsd = async (req, res) => {
    const { userId } = req.params;
    const { action, amount } = req.body;
    if (!action || !amount) {
        return res.status(400).send({ message: 'All Fields are Required.' })
    } 
    if (typeof amount != "number") {
        return res.status(400).send({ message: 'Amount should be numeric' })
    }
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
    } else if (action === 'deposit') {
        await User.updateOne(
        { _id: userId }, 
        { $inc: {
            usdBalance: amount
          }     
        });
    } else {
        return res.status(400).send({ message: 'action should be WITHDRAW or DEPOSIT' })
    }
    try {
        const user = await User.findById(userId);
        return res.status(201).send(user)
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
    if (!action || !amount) {
        return res.status(400).send({ message: 'All Fields are Required.' })
    } 
    if (typeof amount != "number") {
        return res.status(400).send({ message: 'Amount should be numeric' })
    }
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
    } else if (action === "sell") {
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
    } else {
        return res.status(400).send({ message: 'action should be BUY or SELL' })
    }
        const user = await User.findById(userId);
        return res.status(201).send(user)
    } catch {
        return res.status(400).send({ message: error.message })
    }
}

exports.checkBalance = async (req, res) => {
    const { userId } = req.params;
    const { usdBalance, bitcoinAmount} = await User.findById(userId);
    const { price: bitcoinValue } = await Bitcoin.findOne();

    const BALANCE = usdBalance  + (bitcoinAmount * bitcoinValue)
    try {
        return res.status(200).send({ message: `Your Balance is $${BALANCE}`})
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}