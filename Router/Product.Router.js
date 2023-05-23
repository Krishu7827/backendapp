let express = require("express")
let {authentication} = require("../Middleware/authentication")
let {ProductModel} = require("../Model/Product")

let ProductRouter = express.Router()
ProductRouter.use(express.json())

ProductRouter.use(authentication)



ProductRouter.post("/addproducts",async(req,res)=>{
let role = req.body.role

    if(role !== "User"){

    await ProductModel.insertMany(req.body)

    res.send("Product added succesfully")

    }else{

        res.status(404).send("your are  not seller")
    }
})


ProductRouter.delete("/deleteproducts/:id", async(req,res)=>{
    let role = req.body.role
      // console.log(req.params)
    if(role !=="User" ){

    await ProductModel.findByIdAndDelete({_id:req.params.id})

    res.send("Prouduct Deleted")
    }else{

        res.status(404).send("you are not seller")

    }
})


ProductRouter.get("/Products",async(req,res)=>{

    res.send(await ProductModel.find(req.query))
    
})


module.exports = {ProductRouter}



