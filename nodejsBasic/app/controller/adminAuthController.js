const User=require('../models/user'); 
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');  

class AdminAuthController{

    async adminLogin(req,res){
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
      if(existingUser.role =='admin'){
        const token= jwt.sign({
        id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email,
        phone:existingUser.phone,
        role:existingUser.role
      },process.env.ADMIN_JWT_SECRECT,{expiresIn:"1d"})

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone,
          role: existingUser.role
        },
         token: token,
      });
      }else{
        return res.status(400).json({
          success: false,
          message: "You are not admin",
        });
      }

    }catch(error){
       return res.status(500).json({
        success: true,
        message: error.message,
      });
    }
    }


    async adminDashboard(req,res){
      try{
        return res.status(200).json({
          success: true,
          message: "welcome Admin dashboard",
          data: req.admin   
          
        });
      }catch(error){
         return res.status(500).json({
          success: true,
          message: error.message,
        });
      }
    }

}



module.exports = new AdminAuthController();