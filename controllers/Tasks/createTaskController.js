const { createTaskService } = require("../../services");
const { TaskModel } = require("../../models")

module.exports = async function createTaskController(req, res) {
  // console.log(req.body)
  // await createTaskService(req.body);
  // return res.Status(200);

  const task = new TaskModel(req.body);
  await task.save();
  console.log(task)
  return res.send(task)
};