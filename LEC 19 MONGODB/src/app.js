const express = require("express")
const userRouter = require("./routes/user.router")
const app = express()


app.use("/api/users", userRouter)



module.exports = app