const { TaskModel } = require("../models");

module.exports = async function createTaskService(data) {
  const task = new TaskModel(data);
  return task.save();
};
