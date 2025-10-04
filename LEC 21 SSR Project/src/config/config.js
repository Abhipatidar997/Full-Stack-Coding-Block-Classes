require("dotenv").config()

const _config =  {
    PORT : process.env.PORT || 3000,
    MONGO_URI : process.env.MONGO_DB_URI || "mongodb://localhost:27017/lec21ssr",
    JWT_SECRET : process.env.JWT_SECRET || "default_jwt_secret",
    SESSION_SECRET : process.env.SESSION_SECRET || "default_session_secret_123456789",
    imageKit_public_key : process.env.imageKit_public_key || "default_public_key",
    imageKit_private_key : process.env.imageKit_private_key || "default_private_key"
}


const config = Object.freeze(_config)
module.exports = config

