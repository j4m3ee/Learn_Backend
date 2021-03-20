const express = require("express")
const { getUserController,
    createUserController,
    deleteUserController,
    updateUserController,
    authController,
    getUserData } = require("../controllers")
const router = express.Router()

//Token
const jwt = require('jsonwebtoken')
const checkToken = async (myToken, myKey) => {
    const resultVerify = await jwt.verify(myToken, process.env.KEY)
    return resultVerify
}

router.get("/users", (req, res) => getUserController(req, res))

router.post("/user", (req, res) => createUserController(req, res))

router.delete("/user/:id", async (req, res) => deleteUserController(req, res))

router.put("/user", (req, res) => updateUserController(req, res))

router.post("/login", async (req, res) => authController(req, res))

router.get("/user", (req, res) => getUserData(req, res))

// router.get("/user",(req,res)=>{
//     makeHash(testText).then(result => {
//         res.send(result)
//     }).catch(err => {
//         res.send(err)
//     })  
// })

// router.get("/login",(req,res)=>{
// checkHash(testText,expHash).then(result => {
//     const token = jwt.sign(payload,key,{expiresIn: 60*5})
//     res.send(token)
// }).catch(err => {
//     res.send(err)
// })
// })

router.get("/token", (req, res) => {
    const Token = req.headers.token
    checkToken(Token, process.env.KEY).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router