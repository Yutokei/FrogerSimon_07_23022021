const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require('../middleware/auth'); 

router.post("/",         auth,      commentCtrl.createComment);
router.delete("/:id",       auth,      commentCtrl.deleteComment);
router.delete("admin/:id",       auth,      commentCtrl.adminDeleteComment);

router.get("/all", commentCtrl.getAllComments)

module.exports = router;