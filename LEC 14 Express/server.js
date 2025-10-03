const express = require("express")

const app = express()

app.get("/" , function(req, res) {
    res.send("Home route")
})

app.get("/about", (req, res)=>{
    res.send("About route")
})


app.listen(3000, ()=>{
    console.log("server chal rha hai");
    
})