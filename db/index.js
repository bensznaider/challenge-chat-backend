const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  "challenge_chat_database",
  "challenge_chat_database_user",
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
