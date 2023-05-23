let express = require("express")
require("dotenv").config()
let {connection} = require("./db")
let {RoleRouter} = require("./Router/Role.router")
let {ProductRouter} =  require("./Router/Product.Router")
let app = express()

app.get("/",(req,res)=>{
    res.send("welcome to express app for using product >> /product, for Using user function like login,signup etc.>> /Role")
})

app.use("/product",ProductRouter)
app.use("/Role",RoleRouter)


app.listen(process.env.Port,(req,res)=>{

    try{
        connection
        console.log("mongodb is running")

    }catch(err){

        console.log(err)

    }
    console.log("Port is running")
})