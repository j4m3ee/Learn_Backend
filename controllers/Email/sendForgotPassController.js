const { userModel } = require("../../models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../Email/emailModule')
const validator = require('validator');

const sendEmail = async (toMail, message, token) => {
    const result = await transporter.sendMail({
        from: `"TODONA 📝" <${process.env.EMAILUSER}>`, // sender address
        to: toMail, // list of receivers
        subject: "📧 Recovery password ✔", // Subject line
        text: message, // plain text body
        html: `<h2>🎀 thank for using our service.</h2>
        <span>${message}</span>
        <a href=${token}>Click here </a>
        <span>for change your password!</span>`, // html body  
    })
    return result
}

module.exports = function sendForgotPassController(req, res) {
    const { email } = req.body

    userModel.findOne({email}).then(async user => {
        if(!user) throw 'Email not found! 😕'
        if (user) {
            const token = jwt.sign({
                id: user._id
            }, process.env.KEY, { expiresIn: 60 * 60 * 24 }) //expire in 24 hr

            sendEmail(email, "Please recovery within 24hr.",
                `https://snapm.netlify.app/recovery/${token}`)
                .then(result => {
                    return res.send({
                        auth: true,
                        message: `✨ Send recovery password ling to ${email} success.`,
                        result: result
                    })
                }).catch(err => {
                    throw err
                })
        }
    }).catch((err) => {
        return res.status(400).send({ auth: false, message: err })
    })

    // https://snapm.netlify.app/edit/
    // https://learn-backend-snapm.herokuapp.com/api/verify/${token}
    // Credit : https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
}