const { userModel } = require("../../models")

module.exports = async function updateUserController(req,res){
    const user = await userModel.findOneAndUpdate({_id:req.query.id},req.body)
    return res.sendStatus(200)
}