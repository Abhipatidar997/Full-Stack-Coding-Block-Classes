require("dotenv").config()

const _config =  {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_DB_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    imageKit_public_key : process.env.imageKit_public_key, 
    imageKit_private_key : process.env.imageKit_private_key
}


const config = Object.freeze(_config)
module.exports = config