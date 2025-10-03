const app = require("./src/app")


let PORT = 4000

app.listen(PORT, ()=>{
    console.log(`server is running on port no : ${PORT}`);
    
})