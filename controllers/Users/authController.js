const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userModel } = require('../../models')

const checkHash = async (myText, myHash) => {
    const resultPromise = await bcrypt.compare(myText, myHash)
    return resultPromise
}

module.exports = async function authController(req,res){
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).send({ message: 'Please try again' })
    }
    const user = await userModel.findOne({ userName: username })
    checkHash(password, user.password).then(result => {
        if (result) {
            const payload = {
                id: user._id,
                email: user.email
            }
            const token = jwt.sign(payload, process.env.KEY, { expiresIn: 60 * 5 }) //expire in 5 min (60sec * 5)
            const resbody = {
                auth: result,
                token: token
            }
            return res.send(resbody)
        } else {
            const resbody = {
                auth: result
            }
            return res.send(resbody)
        }
    }).catch(err => {
        return res.send(err)
    })
}