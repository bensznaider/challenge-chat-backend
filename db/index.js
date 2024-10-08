const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  "challenge_chat_database_bm1c", // Database
  "challenge_chat_database_bm1c_user", // Username
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

module.exports = db;
