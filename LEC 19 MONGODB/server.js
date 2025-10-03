const app = require("./src/app")
const connect = require("./src/db/db")
const PORT = 4000

app.listen(PORT , ()=>{
    console.log(`server is runing on port no : ${PORT}`);
    connect()
})