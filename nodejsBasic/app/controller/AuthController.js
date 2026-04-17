const User = require("../models/user");
const bcrypt = require("bcryptjs");

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
}

module.exports = new AuthController();
