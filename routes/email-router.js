const express = require("express")
const { sendEmailController, 
    confirmEmailController,
    sendForgotPassController,
    confirmForgotPassController
 } = require("../controllers")
const router = express.Router()

router.post('/sendMail', (req, res) => sendEmailController(req, res))

router.get('/verify/:token', (req,res)=> confirmEmailController(req,res))

router.post("/recovery", (req,res)=> sendForgotPassController(req,res))

router.put('/recovery/:token', (req,res)=> confirmForgotPassController(req,res))

module.exports = router