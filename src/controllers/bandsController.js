const { JsonWebTokenError} = require('jsonwebtoken')
const bands = require('../models/bands')
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')


const authorizeAndRun = (req, res, doAction) => {
    const authHeader = req.get('authorization')

    if(!authHeader) {
        return res.status(401).send('Authorization header missing')
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET, function(erro) {
        if(erro) {
        return res.status(403).send('Authorization is not valid')
        }

        doAction() 
    })
}

const getAll = (req, res) => {
    authorizeAndRun(req, res, () => {
        bands.find(function(err, bands) {
            if(err) {
                res.status(500).send({ message:err.message})
            }
            res.status(200).send(bands)
        })
    })
}

const postBand = (req, res) => {
    authorizeAndRun(req, res, () => {
        let band = new bands(req.body)

        band.save(function(err){
            if(err) {
                res.status(500).send({ message: err.message })
            }
            res.status(201).send(band.toJSON())
        })
    })
}

const deleteBand = (req, res) => {
    authorizeAndRun(req, res, () => {
        const id = req.params.name

        bands.find({ name }, function(err, band) {
            if(band.length > 0){
                bands.deleteMany({ name }, function(err) {
                    if(err) {
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    }
                    res.status(200).send({
                        message: "Band successfully removed",
                        status:"SUCCESS"
                    })
                })
            } else {
                res.status(200).send({
                    message: "No band to be removed",
                    status: "EMPTY"
                })
            }
        })
    })
}

module.exports = { getAll, postBand, deleteBand }