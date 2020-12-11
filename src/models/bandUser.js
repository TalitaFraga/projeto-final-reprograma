const mongoose = require('mongoose')

const bandUserSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String}
})

const bandUser = mongoose.model('bandUser', bandUserSchema)

module.exports = bandUser