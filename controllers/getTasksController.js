const {getTasksService} = require("../services")

module.exports = async function getTasksController(req,res){

    const result = await getTasksService(req.query.isFinished)
    return res.send(result)
}