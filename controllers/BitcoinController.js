const Bitcoin = require('../models/Bitcoin')

exports.updateBitcoin = async (req, res) => {
    const { price } = req.body;
    try {
        await Bitcoin.updateOne(
            { $set: { price } }
        );
        return await this.getBitcoin(req, res)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.getBitcoin = async (req, res) => {
    const bitcoin = await Bitcoin.findOne()
    const { price, updatedAt } = bitcoin
    try {
        return res.status(200).json({ price, updatedAt })
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}