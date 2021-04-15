const { TaskModel } = require('../../models')

module.exports = async function analyticsTaskController(req,res){
    const user_id = req.params.id
    const tasks = await TaskModel.find({user_id: user_id})
    return res.send(tasks.count())
}