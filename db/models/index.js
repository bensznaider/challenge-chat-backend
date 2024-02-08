const Users = require("./Users.js");
const Chats = require("./Chats.js");

Users.hasMany(Chats);
Chats.belongsTo(Users);

module.exports = { Chats, Users };
