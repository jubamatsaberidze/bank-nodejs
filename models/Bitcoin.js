const mongoose = require('mongoose');

const BitcoinSchema = new mongoose.Schema({
    price: {
        type: Number,
        default: 100.00,
    },
}, { timestamps: true}, );

module.exports = mongoose.model('Bitcoin', BitcoinSchema);