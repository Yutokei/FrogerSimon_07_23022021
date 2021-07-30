const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require('../middleware/auth'); 

router.get("/",          auth,      commentCtrl.getAllComments);
router.post("/",         auth,      commentCtrl.createComment);
router.delete("/",       auth,      commentCtrl.deleteComment);

module.exports = router;