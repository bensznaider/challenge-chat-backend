const Sequelize = require("sequelize");
const db = require("../index.js");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {
  hash(unhashedPass, salt) {
    return bcrypt.hash(unhashedPass, salt);
  };
  validatePassword = function (passwordFromUser) {
    return bcrypt
      .hash(passwordFromUser, this.salt)
      .then((hash) => hash === this.password)
  }
}

Users.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

Users.addHook("beforeCreate", (user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = Users;
