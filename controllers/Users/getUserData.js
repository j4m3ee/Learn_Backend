const jwt = require('jsonwebtoken')
const { userModel } = require('../../models')

const checkToken = async (myToken) => {
    const resultVerify = await jwt.verify(myToken, process.env.KEY)
    return resultVerify
}

module.exports = async function getUserData(req,res){
    checkToken(req.headers.token).then(async result => {
        const user = await userModel.findOne({ _id: result.id })
        const resBody = {
            _id:user._id,
            userName:user.userName,
            email:user.email,
            phonenumber:user.phonenumber,
            profileURL:user.profileURL
        }
        return res.send(resBody)
    }).catch(err => {
        if(err){
            return res.send(err)
        }else{
            return res.sendStatus(401)
        }
    })
}