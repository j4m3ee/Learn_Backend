const { TaskModel, userModel } = require("../models")

module.exports = async function updateTaskService(id, data) {
    const task = await TaskModel.findOneAndUpdate({ _id: id }, data)
    const user = await userModel.findOne({ _id: task.user_id })
    var donePost = user.donePost
    var undonePost = user.undonePost
    if (data.isFinished == 'true') {
        donePost -= 1
        undonePost += 1
    } else {
        donePost += 1
        undonePost -= 1
    }
    await userModel.updateOne({ _id: task.user_id }, {
        donePost: donePost,
        undonePost: undonePost
    })
}