const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userModel } = require('../../models')

const checkHash = async (myText, myHash) => {
    const resultPromise = await bcrypt.compare(myText, myHash)
    return resultPromise
}

module.exports = function authController(req, res) {
    const { userName, password } = req.body
    try{
        if (!userName || !password) {
            throw 'Missed userName or password 😮'
        }
    }catch (err) {
        return res.status(400).send({ auth: false , message: err })
    }

    userModel.findOne({ userName }).then(user => {
        if(!user.verify){
            return res.send({ auth: false, message: `📧 Please verify your email!` })
        }
        checkHash(password, user.password).then(result => {
            if (result) {
                const token = jwt.sign({
                    id: user._id,
                    userName: user.userName
                }, process.env.KEY, { expiresIn: 60 * 60 }) //expire in 5 min (60sec * 5)
                return res.send({ auth: result, message: `✨ Logged in success.`, token: token ,detail: `😅 '${userName}' Logged in success.`})
            } else {
                return res.send({ auth: result, message: "🤔 Password invalid" })
            }
        }).catch(err => {
            return res.send({ auth: false, message: "😱 Hash invalid." })
        })
    }).catch(err => {
        return res.status(400).send({ auth: false, message: `😅 Not found your account.` ,detail: `😅 Not found '${userName}'.`})
    })
}
