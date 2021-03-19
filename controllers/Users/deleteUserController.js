const { userModel } = require("../../models")

module.exports = async function deleteUserController(req,res){
    await userModel.deleteOne({_id:req.params.id})
    return res.send("Deleted")
}