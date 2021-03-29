const jwt = require('jsonwebtoken')
const { userModel } = require('../../models')

const checkToken = async (myToken) => {
    const resultVerify = await jwt.verify(myToken, process.env.KEY)
    return resultVerify
}

module.exports = async function confirmEmailController(req,res){
    checkToken(req.params.token).then(async result => {
        const user = await userModel.findOneAndUpdate({_id: result.id},{verify:true})
        return res.send({verify:true,message:'Verify success'})
    }).catch(err => {
        return res.send({verify:false,message:err})
    })
}