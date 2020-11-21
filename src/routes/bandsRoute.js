require('dotenv-safe').config()
const express = require("express")
const router = express.Router()
const controller = require("../controllers/bandsController")

router.get("/", controller.getAll)
router.post("/", controller.postBand)
router.delete("/:name", controller.deleteBand)

module.exports = router