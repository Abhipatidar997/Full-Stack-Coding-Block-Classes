const postModel = require("../models/posts.model");

module.exports.indexController = async function (req, res) {
    try {


        const user = req.session.user || null
        const posts = await postModel.find().populate("author")

        res.render("index.ejs", {title : "Home page" , user : user , posts })
    
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "internal server error" , error : error.message})
       
    }
}