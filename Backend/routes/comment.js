const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require('../middleware/auth'); 

router.get("/id:",          auth,      commentCtrl.getCommentsByPost);
router.post("/",         auth,      commentCtrl.createComment);
router.delete("/id:",       auth,      commentCtrl.deleteComment);
router.delete("admin/id:",       auth,      commentCtrl.adminDeleteComment);

module.exports = router;