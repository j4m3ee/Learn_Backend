const { userModel } = require("../../models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = function createUserController(req, res) {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).send({ auth: false , message: 'Missed userName or password 😮' })
    }
    userModel.findOne({ userName }).then(async user => {
        if (!user) {
            req.body.password = await bcrypt.hash(password, 10)

            const user = new userModel({
                ...req.body,
            })
            await user.save()
            const token = jwt.sign({
                id: user._id,
                userName: user.userName
            }, process.env.KEY, { expiresIn: 60 * 60 }) //expire in 5 min (60sec * 5)
            return res.send({ auth: true, message: `✨ Create ${userName} success.`, token: token })
        } else { 
            return res.status(400).send({ auth: false, message: `😅 ${userName} is aready have.` }) 
        }
    })



}