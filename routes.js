const express = require("express")
const router = express.Router()
const { getTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController } = require("./controllers")
const { TaskModel } = require("./models");

router.get("/tasks", (req, res) => getTasksController(req, res))

router.post("/task", (req, res) => createTaskController(req, res))

router.post("/tasks", async (req, res) => {
    const task = new TaskModel({
        ...req.body,
    });

    await task.save();
    res.send(task);
    res.send();
});

router.put("/task", (req, res) => updateTaskController(req, res))

router.delete("/task/:id", (req, res) => deleteTaskController(req, res))

// router.get('/students', (req, res) => {
//     res.json(students)
// })

// router.get('/students/:id', (req, res) => {
//     res.json(students.find(students => students.id === req.params.id))
// })

// //Postman 
// router.use(express.json())
// router.use(express.urlencoded({extended:true}))

// router.post('/students', (req, res) => {
//     students.push(req.body)
//     res.status(201) //created
//     res.json(req.body)
// })

// router.put('/students/:id', (req, res) => {
//     const updateIndex = students.findIndex(students => students.id === req.params.id)
//     res.json(Object.assign(students[updateIndex], req.body))
// })

// router.delete("/students/:id", (req, res) => {
//     const delIndex = students.findIndex(
//       (students) => students.id === req.params.id
//     );
//     students.splice(delIndex, 1);
//     res.status(204).send()
//   })

module.exports = router