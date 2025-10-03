const express = require("express")
const userRouter = require("./routes/user.router")
const morgan = require("morgan")
const app = express()

app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

// app.use((req,res,next)=>{
//     console.log(req.path , req.method);
    
//     console.log("first middleware ");
//     req.name = "raj"
//     next()
// })


// app.use((req,res,next)=>{

//     console.log("second middleware ");
//     next()
// })


app.use("/api/users",userRouter)


module.exports = app