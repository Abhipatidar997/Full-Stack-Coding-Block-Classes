const app = require("./src/app")

let PORT = 4000


app.listen(PORT , ()=>{
    console.log(`server is runing on port ${PORT}`);
    
})