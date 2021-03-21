const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userModel } = require('../../models')

const checkHash = async (myText, myHash) => {
    const resultPromise = await bcrypt.compare(myText, myHash)
    return resultPromise
}

module.exports = function authController(req, res) {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).send({ message: 'Please try again' })
    }
    userModel.findOne({ userName }).then(user => {
        checkHash(password, user.password).then(result => {
            if (result) {
                const token = jwt.sign({
                    id: user._id,
                    userName: user.userName
                }, process.env.KEY, { expiresIn: 60 * 60 }) //expire in 5 min (60sec * 5)
                return res.send({ auth: result, token: token })
            } else {
                return res.send({ auth: result, message: "Password invalid" })
            }
        }).catch(err => {
            return res.send({ auth: false, message: "Hash invalid." })
        })
    }).catch(err => {
        return res.send({ auth: false, message: "No user in database." })
    })
}
