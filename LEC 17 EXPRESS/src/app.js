const express = require("express")
const userRouter = require("./routes/user.router")
const authRouter = require("./routes/auth.router")


const path = require("path")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname,"../public")))



app.use("/api/users", userRouter)
app.use("/", authRouter)

module.exports = app