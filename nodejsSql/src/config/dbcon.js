const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejs_11am", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
