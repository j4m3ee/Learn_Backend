const { userModel } = require("../../models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../Email/emailModule')
const validator = require('validator');

const sendEmail = async (toMail, message, token) => {
    const result = await transporter.sendMail({
        from: `"TODONA 📝" <${process.env.EMAILUSER}>`, // sender address
        to: toMail, // list of receivers
        subject: "📧 Mail verify ✔", // Subject line
        text: message, // plain text body
        html: `<h2>🎀 Thank for registered to TODONA.</h2>
        <span>${message}</span>
        <a href=${token}>Click here </a>
        <span>for verify your account!</span>`, // html body  
    })
    return result
}

module.exports = function createUserController(req, res) {
    const { userName, password, email } = req.body
    try {
        if (!userName || !password) {
            throw 'Missed userName or password 😮'
        }
        if(!validator.isAlphanumeric(userName)){
            throw 'Enter username only alphabets and numeric 😚'
        }
        if (!validator.isStrongPassword(password, { 
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1
        })) {
            throw 'Your password not strong 🤨'
        }
        
    } catch (err) {
        return res.status(400).send({ auth: false, message: err })
    }

    userModel.findOne({ $or: [{ userName }, { email }] }).then(async user => {
        if (user) throw `😅 Username or Email is aready have.`
        if (!user) {
            req.body.password = await bcrypt.hash(password, 10)
            const user = new userModel({
                ...req.body
            })
            await user.save()
            const token = jwt.sign({
                id: user._id
            }, process.env.KEY, { expiresIn: 60 * 60 * 24 }) //expire in 5 min (60sec * 5)

            sendEmail(req.body.email, "Please verify within 24hr",
                `https://snapm.netlify.app/verify/${token}`)
                .then(result => {
                    return res.send({
                        auth: true,
                        message: `✨ Create ${userName} success. Please verify email!`,
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