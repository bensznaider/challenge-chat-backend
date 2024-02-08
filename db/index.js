const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  "challenge_chat",
  "challenge_chat_user",
  process.env.DB_PASSWORD,
  {
    host: "dpg-cn2cr47109ks7395emug-a.oregon-postgres.render.com",
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
