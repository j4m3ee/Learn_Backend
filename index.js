const express = require("express")
const app = express()
const {postRoutes,taskRoutes,userRoutes} = require("./routes")
const mongoose = require("mongoose")
const cors = require("cors");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// mongoose.connect("mongodb://localhost:27017/todona").then(()=>{
//     console.log("Database connected at port 27017")
// })

mongoose.connect("mongodb+srv://dbUser:Jame.011@cluster0.xqyje.mongodb.net/todona?retryWrites=true&w=majority"
,{useNewUrlParser:true}).then(()=>{
    console.log("✨ Database connected")
}).catch((error)=>{
    console.log(error)
})

app.use("/api",taskRoutes)

app.use('/api',postRoutes)

app.use('/api',userRoutes)

app.listen( process.env.PORT || 1000, () => {
    console.log('🚗 Server Start.')
})

// localhost:1000 --> Web server
// localhost:27017 --> MongoDB server