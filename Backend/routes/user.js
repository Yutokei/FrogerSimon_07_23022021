const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Routage
router.post('/signup',      auth, userCtrl.signup);
router.post('/login',       auth, userCtrl.login);
router.get('/profile',      auth, userCtrl.userProfile);
router.put('/profile',      auth, userCtrl.changePassword);
router.delete('/profile',   auth, userCtrl.deleteProfile)

module.exports = router;