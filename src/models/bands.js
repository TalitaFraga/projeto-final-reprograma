const mongoose = require('mongoose')

const bandsSchema = new mongoose.Schema({
    name: {type: String},
    city: {type: String},
    style: {type: String},
    instagram:{type: String},
    twitter:{type: String},
    venue:[{type:String}]
})

const bands = mongoose.model('bands', bandsSchema)

module.exports = bands