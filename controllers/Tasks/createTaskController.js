const { createTaskService } = require("../../services");
const { TaskModel,userModel } = require("../../models")

module.exports = async function createTaskController(req, res) {
  const task = new TaskModel(req.body);
  await task.save();
  return res.send(task)
};