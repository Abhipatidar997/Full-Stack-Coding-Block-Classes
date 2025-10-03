const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

module.exports.registerController = async function (req, res) {
  const { username, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);

    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const exist = await userModel.findOne({ email: email });
    console.log(exist);

    if (exist) {
      return res.status(400).json({ message: "email is allready axist " });
    }

    const user = await userModel.create({
      username: username,
      email: email,
      password: hashedPass,
    });

    res.status(201).json({ message: "register successfully", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports.loginController = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const user =  await userModel.findOne({
        email : email
    })

    if(!user){
        return res.status(400).json({message : "invalid credintial"})
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        return res.status(400).json({message : "invalid credintial"})
    }

    const token = await jwt.sign({ id : user._id , username : user.username , email : user.email }, "ljsahfhdfljdsahf")

    res.status(200).json({message : "login successfully" , token})

  } catch (error) {

  }
};
