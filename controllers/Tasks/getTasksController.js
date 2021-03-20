const {getTasksService} = require("../../services")

module.exports = async function getTasksController(req,res){
    const {isFinished,user_id} = req.query
    const result = await getTasksService(isFinished,user_id)
    return res.send(result)
}