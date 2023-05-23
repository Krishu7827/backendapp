let express = require("express")
let JWT = require("jsonwebtoken")
let { blacklisting } = require("../Router/Role.router")
let app = express()
app.use(express.json())
 console.log(blacklisting)
let authentication = (req, res, next) => {
    let token = req.headers.authorization
  
      
    if (!blacklisting.includes(token)) {


        JWT.verify(token, 'token', function (err, decoded) {

            if (err) {

                JWT.verify(token, 'refresh', function (err, decoded) {

                    if (err) {

                        res.status(404).send("accesstoken invalid")

                    } else {

                        req.body.role = decoded.role
                    
                        next()

                    }
                })

            } else {
                req.body.role = decoded.role
                next()
                console.log(decoded)

              

            }
        });
    } else {
        res.status(404).send("you are logout")
    }
}

module.exports = {authentication}