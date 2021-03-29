const express = require("express")
const { sendEmailController, confirmEmailController } = require("../controllers")
const router = express.Router()

router.post('/sendMail', (req, res) => sendEmailController(req, res))

router.get('/verify/:token', (req,res)=> confirmEmailController(req,res))

module.exports = router