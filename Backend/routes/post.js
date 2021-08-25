const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth')

//Routage
router.put      ("/:id", auth,         postCtrl.updatePost)
router.post     ("/",    auth,         postCtrl.createPost);
router.get      ("/",    auth,         postCtrl.getAllPosts);
router.get      ("/user",auth,         postCtrl.getAllPostsFromUser)
router.delete   ("/:id", auth,         postCtrl.deletePost);

module.exports = router; 