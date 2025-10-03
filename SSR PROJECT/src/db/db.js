const mongoose = require("mongoose")
const config = require("../config/config")


const connect = ()=>{
    mongoose.connect(config.MONGO_URI)
    .then(()=>{
        console.log("database connect");
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
}


module.exports = connect