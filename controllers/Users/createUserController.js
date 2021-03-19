const { userModel } = require("../../models")
const bcrypt = require('bcryptjs')

module.exports = async function createUserController(req,res){
    const body = req.body
    if (!body.userName || !body.password) {
        return res.status(400).send({ message: 'Please try again' })
    }
    body.password = await bcrypt.hash(body.password,10)
    
    const user = new userModel({
        ...body,
    })
    await user.save()
    return res.send(user)
}