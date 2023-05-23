let express = require("express")
let CryptoJS = require("crypto-js")
let JWT = require("jsonwebtoken")
let {RoleModel} = require("../Model/Role.model")
let RoleRouter = express.Router()
let blacklisting = []
RoleRouter.use(express.json())

RoleRouter.post("/signup", async(req,res)=>{


    let plainpassowrd  = req.body.password 

    const encryptionKey = 'evaluation';

const encryptedPassword = CryptoJS.AES.encrypt(plainpassowrd, encryptionKey).toString();
       
req.body.password = encryptedPassword
   
await RoleModel.insertMany([req.body])

 res.send("login success")

    



})


RoleRouter.get("/login",async(req,res)=>{

    let data = await RoleModel.find(req.query)
   
    //console.log(data[0].password)
    const decryptedPassword = CryptoJS.AES.decrypt(data[0].password, 'evaluation').toString(CryptoJS.enc.Utf8);

     if(decryptedPassword){

     let token =   JWT.sign({
           role:data[0].role
          }, 'token', { expiresIn: "1m" })

          let refreshtoken = JWT.sign({role:data[0].role,},"refresh",{expiresIn:"5m"})

          res.send({accesstoken: token, refreshtoken:refreshtoken})
     }

    
})


RoleRouter.get("/logout",(req,res)=>{

    let token = req.headers.authorization
 

    blacklisting.push(token)

    res.send("logout")
  

})


module.exports = {RoleRouter,blacklisting}




