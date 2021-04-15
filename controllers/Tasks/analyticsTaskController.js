const { TaskModel } = require('../../models')

module.exports = async function analyticsTaskController(req,res){
    const user_id = req.params.id
    const tasks = await TaskModel.count({user_id: user_id})
    const doneTask = await TaskModel.count({isFinished: true,user_id: user_id})
    const undoneTask = await TaskModel.count({isFinished: false,user_id: user_id})
    return res.send({tasks,doneTask,undoneTask})
}