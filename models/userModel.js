const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type:String,
        require: true,
        min: 4,
        max: 15
    },
    password: {
        type:String,
        require: true,
        min: 6,
        max: 20
    }
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel