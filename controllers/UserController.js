const User = require('../models/User')

exports.addUser = async (req, res) => {
    const { name, username, email } = req.body;
    const user = new User({
        name,
        username,
        email,
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    // console.log('HERE', `${id}`.red.underline.bold)
    const user = await User.findById(id)
    try {
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}