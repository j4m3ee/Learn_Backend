const { model } = require('mongoose')
const {TaskModel} = require('../models/')

module.exports = async function getTasksService ( isFinished ) {
    const tasks = await TaskModel.find({isFinished: isFinished})
    return tasks
}
