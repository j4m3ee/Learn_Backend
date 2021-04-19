const { model } = require('mongoose')
const {TaskModel} = require('../models/')

module.exports = async function getTasksService ( isFinished,user_id ) {
    const tasks = await TaskModel.find({isFinished: isFinished,user_id: user_id}).sort({"time":1})
    return tasks
}
