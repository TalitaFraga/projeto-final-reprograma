const mongoose = require('mongoose')

const bandasSchema = new mongoose.Schema({
    banda: {type: String},
    cidade: {type: String},
    estilo: {type: String},
    instagram:{type: String},
    twitter:{type: String},
    localOndeToca:[{type:String}]
})

const bandas = mongoose.model('bandas', bandasSchema)

module.exports = bandas