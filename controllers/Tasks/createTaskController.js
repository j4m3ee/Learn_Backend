const { createTaskService } = require("../../services");
const { TaskModel,userModel } = require("../../models")

module.exports = async function createTaskController(req, res) {
  const user = await userModel.findOne({_id:req.body.user_id})
  await userModel.updateOne({_id:req.body.user_id},{
    countPost:user.countPost+1,
    undonePost:user.undonePost+1
  })
  const task = new TaskModel(req.body);
  await task.save();
  return res.send(task)
};