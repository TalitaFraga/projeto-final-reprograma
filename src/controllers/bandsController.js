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

const buildRegex = word => {
    let regexString = word.replace(new RegExp(/a/g), '[aàáâãäå]')
    regexString = regexString.replace(new RegExp(/e/g), '[eèéêë]')
    regexString = regexString.replace(new RegExp(/i/g), '[iìíîï]')
    regexString = regexString.replace(new RegExp(/o/g), '[oòóôõö]')
    regexString = regexString.replace(new RegExp(/u/g), '[uùúûü]')
    regexString = regexString.replace(new RegExp(/ç/g), '[cç]')
    regexString = regexString.replace(new RegExp(/n/g), '[nñ]')
    return new RegExp(regexString, 'i')
    }



const getAll = (req, res) => {
    const searchParams = {}
    if (req.query.style) {
        searchParams.style = buildRegex(req.query.style, 'i')
    }
    if(req.query.name) {
        searchParams.name = buildRegex(req.query.name, 'i')
    }
    if(req.query.city) {
        searchParams.city = buildRegex(req.query.city, 'i') 
    }
    if(req.query.venue) {
        searchParams.venue = buildRegex(req.query.venue, 'i')
    }

    bands.find(searchParams, function(err, bands) {
        if(err) {
            res.status(500).send({ message:err.message})
        }
        res.status(200).send(bands)
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
        const id = req.params.id

        bands.find({ _id: id }, function(err, band) {
            if(band.length > 0){
                bands.deleteMany({ _id: id }, function(err) {
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

const putBands = (req, res) => {
    authorizeAndRun(req, res, () => {
        const id = req.params.id
        
        bands.find({ _id: id }, function(err, band) {
            console.log(id, err, band)
            if(band.length > 0) {
                bands.updateMany({ _id: id }, { $set: req.body}, function(err) {
                    if(err) {
                        res.status(500).send ({ message: err.message})
                    }
                        res.status(200).send({ message: "registry successfully changed"})
                })
            }else {
                res.status(200).send({ message: "There are no registry to update with this id"})
            }
        })
    })
}


module.exports = { getAll, postBand, deleteBand, putBands }