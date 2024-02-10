const Sequelize = require("sequelize");
const db = require("../index.js");

class Chats extends Sequelize.Model {}

Chats.init(
  {
    name: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "chats" }
);

module.exports = Chats;
