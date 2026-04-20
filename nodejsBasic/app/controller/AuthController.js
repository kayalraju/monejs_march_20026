const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({
          success: false,
          message: "User already exist",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const userdata = new User({
        name,
        email,
        phone,
        password: hashPassword,
      });
      const result = await userdata.save();
      if (result) {
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: result,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: "User created successfully",
      });
    }
  }


  async login(req,res){
    try{
      const {email,password}=req.body
      if(!email || !password){
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingUser=await User.findOne({email})
      if(!existingUser){
       return res.status(400).json({
        success: false,
        message: "User not found",
       })
      }

      const isMatch=await bcrypt.compare(password,existingUser.password)
      if(!isMatch){
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const token= jwt.sign({
        id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email,
        phone:existingUser.phone
      },process.env.JWT_SECRECT,{expiresIn:"1d"})

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone,
        },
         token: token,
      });

    }catch(error){
       return res.status(500).json({
        success: true,
        message: error.message,
      });
    }
  }

  async dashboard(req,res){
    try{
      return res.status(200).json({
        success: true,
        message: "welcome User dashboard",
        dsat: req.user
      });
    }catch(error){
       return res.status(500).json({
        success: true,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
