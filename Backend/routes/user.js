const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

//Routage
router.get("/auth", auth, userCtrl.validateToken);

router.post("/signup", userCtrl.signUp);
router.post("/login", userCtrl.signIn);
router.get("/logout", auth, userCtrl.logout);

router.get("/", auth, userCtrl.getAllProfiles);
router.get("/:id", auth, userCtrl.userProfile);
router.delete("/:id", auth, userCtrl.deleteProfile);

module.exports = router;
