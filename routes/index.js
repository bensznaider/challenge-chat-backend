const express = require("express");
const router = express.Router();
const users = require("./users.js");
const chats = require("./chats.js");

router.use("/users", users);
router.use("/chats", chats);

module.exports = router;
