const Users = require("./Users.js");
const Chats = require("./Chats.js");
const Messages = require("./Messages.js");

Users.hasMany(Chats);
Chats.belongsTo(Users);
Chats.hasMany(Messages);
Messages.belongsTo(Users);
Messages.belongsTo(Chats);

module.exports = { Chats, Users, Messages };
