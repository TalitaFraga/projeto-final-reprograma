const bandUser = require('../models/bandUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /[a-z]\d|\d[a-z]/i
    return re.test(password) && password.length >= 6
}

const signup = (req, res) => {

    if(!validateEmail(req.body.email)) {
        res.status(400).send("This email is not valid")
    }

    if(!validatePassword(req.body.password)) {
        res.status(400).send("This password is not valid")
    } 

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
            return res.status(404).send(`No user with email ${req.body.email}`)
        }
        const validPassword = bcrypt.compareSync(req.body.password, band.password)

        if(!validPassword) {
            return res.status(403).send("invalid password")
        }

        const token = jwt.sign({ email: req.body.email}, SECRET)

        return res.status(200).send(token)
    })
}

module.exports = { signup, login }