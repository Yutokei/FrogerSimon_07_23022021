const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.put      ("/id:", auth, multer, postCtrl.updatePost)
router.post     ("/",    auth, multer, postCtrl.createPost);
router.delete   ("/id:", auth,         postCtrl.deletePost)
router.get      ("/",    auth,         postCtrl.getAllPosts);

module.exports = router; 