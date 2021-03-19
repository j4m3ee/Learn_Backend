const { updateTaskService } = require("../../services")

module.exports = async function updateTaskController(req, res) {
    await updateTaskService(req.query.id, req.body)
    return res.send(200)
} 