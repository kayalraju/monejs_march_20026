const sequelize = require("../config/dbcon");
const Student = require("./student");
const Product = require("./product");

// Sync all models
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Error syncing DB:", err));

module.exports = { Student, Product };
