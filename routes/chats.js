const express = require("express");
const router = express.Router();
const { chatsController } = require("../controllers/index.js");

router.get("/all-messages/:userid", chatsController.getChatsByUser);
router.post("/add-message", chatsController.addMessage);
router.delete("/delete-message", chatsController.deleteMessage);

module.exports = router;
