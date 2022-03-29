const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    firstName: String,
    lastName: String,
})

const User = mongoose.model('user', userSchema)

module.exports = User