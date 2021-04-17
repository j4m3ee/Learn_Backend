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
    },
    email:{
        type:String
    },
    phonenumber:{
        type:String
    },
    verify: { type: Boolean, default: false },
    profileURL: {type: String}
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel