const UserModel = require("../../models/userModel")

module.exports = async function getUserController(req,res){
    const user = await UserModel.find()
    return res.send(user)
}