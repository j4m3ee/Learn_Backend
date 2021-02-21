const {deleteTaskService} = require('../services')

module.exports = async function deleteTaskController(req,res){
    await deleteTaskService(req.params.id)
    return res.send("Deleted")
}