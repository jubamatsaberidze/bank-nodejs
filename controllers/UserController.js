const User = require('../models/User')

exports.addUser = async (req, res) => {
    const { name, username, email } = req.body;
    const user = new User({
        name,
        username,
        email,
    })
    if (!name || !username || !email) return res.status(400).send({ message: 'All Fields are Required.' })
    try {
        const newUser = await user.save();
        res.status(201).send(newUser)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }

}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    try {
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, username, email } = req.body;
    const updated = await User.findByIdAndUpdate( id, {
        name, username, email
    });
    try {
        return await this.getUserById(req, res)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}