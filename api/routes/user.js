const express = require("express");
const router = express.Router();
const chechAuth = require("../middleware/check-auth"); // middleware

const UserControler = require("../controllers/user");

router.post("/signup", UserControler.user_signup);

router.post("/login", UserControler.user_login);

// router.get("/", UserControler.user_data);

router.post("/check-auth", chechAuth, UserControler.user_data);

router.delete("/:userId", chechAuth, UserControler.user_delete);

module.exports = router;
