const jwt = require('jsonwebtoken')
const { userModel } = require('../../models')
const bcrypt = require('bcryptjs')
const validator = require('validator');

const checkToken = async (myToken) => {
    const resultVerify = await jwt.verify(myToken, process.env.KEY)
    return resultVerify
}

module.exports = async function confirmForgotPassController(req,res){
    checkToken(req.params.token).then(async result => {
        const {password} = req.body

        if (!validator.isStrongPassword(password, { 
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1
        })) {
            throw 'Your password not strong. 🤨'
        }
        
        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.findOneAndUpdate({_id: result.id},{password:hash})
        return res.send({verify:true,message:'Verify success',email:user.email})
    }).catch(err => {
        return res.send({verify:false,message:err})
    })

    // put: https://learn-backend-snapm.herokuapp.com/api/recovery/${token}
}