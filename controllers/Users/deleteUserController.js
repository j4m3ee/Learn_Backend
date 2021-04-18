const { userModel } = require("../../models")
const jwt = require('jsonwebtoken')

const checkToken = async (myToken) => {
    const resultVerify = await jwt.verify(myToken, process.env.KEY)
    return resultVerify
}

module.exports = async function deleteUserController(req, res) {
    checkToken(req.headers.token).then(async result =>{
        await userModel.deleteOne({ _id: result.id })
        return res.send({ message: "👻 Deleted." })
    }).catch(err => {
        if(err){
            return res.send(err)
        }else{
            return res.sendStatus(401)
        }
    })
}