const { TaskModel } = require("../models")

module.exports = async function createTaskService(data) {
  
  const task = new TaskModel(data);
  console.log(task)
  return task.save();
};
