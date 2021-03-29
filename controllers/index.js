const getTasksController = require("./Tasks/getTasksController")
const createTaskController = require("./Tasks/createTaskController")
const deleteTaskController = require("./Tasks/deleteTaskController")
const updateTaskController = require("./Tasks/updateTaskController")
const postController = require('./postController')
const getUserController = require("./Users/getUserController")
const createUserController = require("./Users/createUserController")
const deleteUserController = require("./Users/deleteUserController")
const updateUserController = require("./Users/updateUserController")
const authController = require("./Users/authController")
const getUserData = require("./Users/getUserData")
const getOneTaskController = require("./Tasks/getOneTaskCotroller")
const sendEmailController = require('./Email/sendEmailController')
const confirmEmailController = require('./Email/confirmEmailController')

module.exports = {
    getTasksController,
    createTaskController,
    deleteTaskController,
    updateTaskController,
    postController,
    getUserController,
    createUserController,
    deleteUserController,
    updateUserController,
    authController,
    getUserData,
    getOneTaskController,
    sendEmailController,
    confirmEmailController
}