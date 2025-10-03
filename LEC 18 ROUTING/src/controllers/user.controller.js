const registerController = function(req,res){
    // console.log(req);

    res.send("register successfully")
    
}


const loginController = function(req,res) {
    res.send("login successfully....")   
}



module.exports = {
    registerController,
    loginController
}

