require("dotenv").config();
const express = require("express");
const sequelize = require("./src/config/dbcon");
require("./src/model/index"); // sync tables

const app = express();
app.use(express.json());

// Routes



const productRoutes = require("./src/router/product");
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => {
    console.log(" Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ DB connection error:", err));
