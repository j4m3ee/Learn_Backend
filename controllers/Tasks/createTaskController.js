const { TaskModel } = require("../../models")

module.exports = async function createTaskController(req, res) {
  const task = new TaskModel(req.body);
  await task.save();
  return res.send(task)
};