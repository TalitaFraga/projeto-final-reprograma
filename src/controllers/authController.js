const bandUser = require('../models/bandUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const signup = (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = passwordHash
    let band = new bandUser(req.body)
    band.save(function(err){
        if(err) {
            res.status(500).send({ message: err.message })
        }
            res.status(201).send(band.toJSON())
    })
}

const login = (req, res) => {
    bandUser.findOne({email:req.body.email}, function(error, band){
        if(!band) {
            return res.status(404).send(`Não existe usuário com o email ${req.body.email}`)
        }
        const validPassword = bcrypt.compareSync(req.body.password, band.password)

        if(!validPassword) {
            return res.status(403).send("senha inválida")
        }

        const token = jwt.sign({ email: req.body.email}, SECRET)

        return res.status(200).send(token)
    })
}

module.exports = { signup, login }