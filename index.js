const express = require("express")
const app = express()
const { taskRoutes, userRoutes, emailRoutes } = require("./routes")
const mongoose = require("mongoose")
const cors = require("cors");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// mongoose.connect("mongodb://localhost:27017/todona").then(()=>{
//     console.log("Database connected at port 27017")
// })

mongoose.connect(process.env.DATABASE
    , { useUnifiedTopology: true , useNewUrlParser: true ,useFindAndModify: false}).then(() => {
        console.log("✔ Database connected")
    }).catch((error) => {
        console.log(error)
    })

app.use("/api", taskRoutes)

app.use('/api', userRoutes)

app.use('/api', emailRoutes)

app.listen(process.env.PORT || 1000, () => {
    console.log(`✨ Server Start at Port : ${process.env.PORT}`)
})

// localhost:1000 --> Web server
// localhost:27017 --> MongoDB server