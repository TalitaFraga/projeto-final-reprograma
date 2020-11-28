require('dotenv-safe').config()
const express = require("express")
const router = express.Router()
const controller = require("../controllers/bandsController")

router.get("/", controller.getAll)
router.post("/", controller.postBand)
router.delete("/:id", controller.deleteBand)
router.put("/:id", controller.putBands)

module.exports = router