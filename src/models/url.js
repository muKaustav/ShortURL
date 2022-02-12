const mongoose = require('mongoose')

const URL = mongoose.Schema({
    Hash: {
        type: String,
        required: true,
        unique: true
    },
    OriginalUrl: {
        type: String,
        required: true
    },
    CreatedAt: Date,
    ExpiresAt: Date
})

module.exports = mongoose.model('URL', URL)