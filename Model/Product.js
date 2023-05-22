let mongoose = require("mongoose")


let Schema = mongoose.Schema({
 
    product:String,
    type:String,

   
},{
    versionKey:false
})


let ProductModel = mongoose.model("product",Schema)



 module.exports = {ProductModel}