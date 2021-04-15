const { TaskModel } = require("../models")

module.exports = async function deleteTaskService(id) {
    const task = await TaskModel.deleteOne({ _id: id })
    console.log(task)
}