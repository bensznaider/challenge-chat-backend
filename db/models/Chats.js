const Sequelize = require("sequelize")
const db = require("../index.js")

class Chats extends Sequelize.Model {}

Chats.init(
  {
    isMessageFromUser: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "chats" }
);

module.exports = Chats;