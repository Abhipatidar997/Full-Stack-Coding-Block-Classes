const postModel = require("../models/posts.model");

module.exports.getCreateController = (req, res)=>{
    try {
        
        res.render("create.ejs", {title : "create page"})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
        
    }
}


module.exports.postCreateController = async (req,res)=>{
    try {
        
        const {title , content , image , tags} = req.body

        if(!title || !content || !image){
            return res.render("create.ejs")
        }

        const userId = req.userId

        const post = await postModel.create({
            author : userId,
            title : title,
            image : image, 
            content : content,
            tags : tags
        })

        res.redirect("/")
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
                
    }
}


module.exports.getUpdateController = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await postModel.findById(postId)

        res.render("update.ejs", {post , title : "update page"})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
           
    }
}

module.exports.postUpdateController = async (req ,res) => {
    try {
        const postId = req.params.id
        const {title , content , image , tags} = req.body

        const post = await postModel.findById(postId)

        post.title = title || post.title
        post.content = content || post.content
        post.image = image || post.image
        post.tags = tags || post.tags

        await post.save()

        res.redirect("/")


    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
        
    }
}


module.exports.deletePostController = async (req ,res) => {
    try {
        const postId = req.params.id

        await postModel.findByIdAndDelete(postId)

        res.redirect("/")
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
       
    }
}