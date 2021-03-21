const { TaskModel } = require("../../models")

module.exports = async function getOneTaskController(req,res){
    const task = await TaskModel.findOne({_id:req.params.id})
    return res.send(task)
}