const express = require("express");
const router = express.Router();
const { usersController } = require("../controllers/index.js");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/me", usersController.me);
//TEMPORARY
router.get("/get-users", usersController.getUsers);

module.exports = router;
