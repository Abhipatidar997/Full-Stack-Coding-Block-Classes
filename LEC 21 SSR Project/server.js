const app = require("./src/app")
const config = require("./src/config/config")
const connect = require("./src/db/db")
const PORT = config.PORT || 3000


app.listen(PORT , ()=>{
    console.log("server is running on port no :"+ PORT);
    connect()
})