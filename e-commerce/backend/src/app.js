const express = require("express")
const userRouter = require("../src/routes/user.router")
const authRouter = require("../src/routes/auth.router")
const productRouter = require("../src/routes/product.router")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const session = require('express-session')
const path = require("path")
const config = require("./config/config")
const app = express()
require("dotenv").config()
const cors = require("cors")



app.use(cors("*"))
app.use(cookieParser())
app.use(morgan("dev"))


app.use(session({
  secret: config.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge : 1000 * 60 * 60 * 24
  }
}))



app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.use("/", authRouter)
app.use("/users",userRouter)
app.use("/products",productRouter )



module.exports = app