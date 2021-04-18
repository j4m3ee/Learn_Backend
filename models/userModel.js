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
        require: true
    },
    email:{
        type:String
    },
    phonenumber:{
        type:String
    },
    verify: { type: Boolean, default: false },
    profileURL: {
        type: String, default: ""
    }
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel