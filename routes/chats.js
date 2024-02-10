const express = require("express");
const router = express.Router();
const { chatsController } = require("../controllers/index.js");

router.get("/all-chats/:userid", chatsController.getChatsByUser);
router.post("/create-chat", chatsController.createChat);
router.post("/add-message", chatsController.addMessage);
router.delete("/delete-chat", chatsController.deleteChat);

module.exports = router;
