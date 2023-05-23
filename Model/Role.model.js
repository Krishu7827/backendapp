let mongoose = require("mongoose")


let Schema = mongoose.Schema({

    email:String,
    password:String,
    role:{
        type:String,
        default:"User"
    }
    

},{
    versionKey:false
})


let RoleModel = mongoose.model("role",Schema)

module.exports = {RoleModel}



