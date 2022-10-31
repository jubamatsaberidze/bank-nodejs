const User = require('../models/User')

exports.addUser = async (req, res) => {
    const { name, username, email } = req.body;
    if (typeof name !== 'string' || typeof username !== 'string' || typeof email !== 'string') {
        return res.status(400).send({ message: 'All fields must be string' })
    }
    if (!name.trim() || !username.trim() || !email.trim()) return res.status(400).send({ message: 'All Fields are Required.' })
    try {

        const user = new User({
            name: name.trim(),
            username: username.trim(),
            email: email.trim(),
        })
        const newUser = await user.save();
        return res.status(201).send(newUser)
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
    if (typeof name !== 'string' || typeof username !== 'string' || typeof email !== 'string') {
        return res.status(400).send({ message: 'All fields must be string' })
    }
    if (!name.trim() || !username.trim() || !email.trim()) return res.status(400).send({ message: 'All Fields are Required.' })
    await User.findByIdAndUpdate( id, 
        {
            name: name.trim(),
            username: username.trim(),
            email: email.trim(),
        });
    try {
        return await this.getUserById(req, res)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}