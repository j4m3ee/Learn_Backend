const {deleteTaskService} = require('../services')

module.exports = async function deleteTaskController(req,res){
    deleteTaskService(req.params.id)
    return res.send("Deleted")
}