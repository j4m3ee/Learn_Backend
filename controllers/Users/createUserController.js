const { userModel } = require("../../models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../Email/emailModule')

const sendEmail = async (toMail, message, token) => {
    const result = await transporter.sendMail({
        from: `"TODONA 📝" <${process.env.EMAILUSER}>`, // sender address
        to: toMail, // list of receivers
        subject: "Registered Successfully ✔", // Subject line
        text: message, // plain text body
        html: `<h1>${message}</h1>
        <a href=${token}>Click here!</a>`, // html body
    })
    return result
}

module.exports = function createUserController(req, res) {
    const { userName, password, email } = req.body
    if (!userName || !password) {
        return res.status(400).send({ auth: false, message: 'Missed userName or password 😮' })
    }
    userModel.findOne({ $or:[{userName},{email}]}).then(async user => {
        if(user) throw `😅 Username or Email is aready have.`
        if (!user) {
            req.body.password = await bcrypt.hash(password, 10)
            const user = new userModel({
                ...req.body,
            })
            await user.save()
            // const token = jwt.sign({
            //     id: user._id,
            //     userName: user.userName
            // }, process.env.KEY, { expiresIn: 60 * 60 }) //expire in 5 min (60sec * 5)
            const token = jwt.sign({
                id: user._id
            }, process.env.KEY, { expiresIn: 60 * 60 * 24}) //expire in 5 min (60sec * 5)
  
            sendEmail(req.body.email, "Plese verify within 24hr",
             `https://snapm.netlify.app/edit/${token}`)
             .then(result=>{
                return res.send({ auth: true, 
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
}