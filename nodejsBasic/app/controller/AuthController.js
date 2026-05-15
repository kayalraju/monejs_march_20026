const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const OTPModel = require("../models/otp");

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
      const user = await userdata.save();
      await sendEmail(req, user);
      if (user) {
        return res.status(201).json({
          success: true,
          message: "User created successfully and send Otp to your email",
          data: user,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
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

      if(!existingUser.isVarified){
        return res.status(400).json({
          success: false,
          message: "User not varified",
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

  async verify(req,res){
    try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.isVarified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await OTPModel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.isVarified) {
                    // console.log(existingUser);
                    await sendEmail(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmail(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.isVarified = true;
            await existingUser.save();

            // Delete email verification document
            await OTPModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
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
