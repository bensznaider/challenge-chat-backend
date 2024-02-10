const Sequelize = require("sequelize")
const db = require("../index.js")

class Messages extends Sequelize.Model {}

Messages.init(
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
  { sequelize: db, modelName: "messages" }
);

module.exports = Messages;