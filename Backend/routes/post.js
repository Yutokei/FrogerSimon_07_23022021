const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.put      ("/id:", auth, multer, postCtrl.update)
router.post     ("/", auth, multer, postCtrl.create);
router.delete   ("/id:", auth,         postCtrl.delete)
router.get      ("/",    auth,         postCtrl.getAllPosts);

module.exports = router; 