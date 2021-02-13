const { TaskModel } = require("../models")

module.exports = async function deleteTaskService(id) {
    return TaskModel.deleteOne({ _id: id })
}