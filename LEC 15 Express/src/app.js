const express = require("express")
const authRouter = require("./routes/auth.router")
const userRouter = require("./routes/user.router")

const app = express()

// app.get("/" , (req, res)=>{
//     console.log("req aayi");
//     res.send("Home route")
// })

// app.get("/about" , (req,res)=>{
//     res.send("About route")
// })


app.use("/api/auth/", authRouter )
app.use("/api/users/" , userRouter)




module.exports = app