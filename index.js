let express = require("express")
require("dotenv").config()
let {connection} = require("./db")
let {RoleRouter} = require("./Router/Role.router")
let {ProductRouter} =  require("./Router/Product.Router")
let app = express()


app.use("/products",ProductRouter)
app.use("/Role",RoleRouter)


app.listen(process.env.Port,(req,res)=>{

    try{
        connection

    }catch(err){

        console.log(err)

    }
    console.log("Port is running")
})