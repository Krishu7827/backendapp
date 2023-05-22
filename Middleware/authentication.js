let express = require("express")
let JWT = require("jsonwebtoken")
let { blacklisting } = require("../Router/Role.router")
let app = express()
app.use(express.json())

let authentication = (req, res, next) => {
    let token = req.headers.authorization

    if (!blacklisting.includes(token)) {
        jwt.verify(token, 'token', function (err, decoded) {

            if (err) {
                jwt.verify(token, 'refresh', function (err, decoded) {
                    if (err) {
                        res.send("accesstoken invalid")
                    } else {

                        req.body.role = decoded.role
                        next()
                    }
                })
            } else {
                next()

                req.body.role = decoded.role

            }
        });
    } else {
        res.send("you are logout")
    }
}

module.exports = {authentication}