const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Routage
router.post('/signup',      auth, userCtrl.signup);
router.post('/login',       auth, userCtrl.login);
router.post('/login/admin', auth, userCtrl.login);
router.get('/allProfile',   auth, userCtrl.getAllProfile);
router.get('/profile',      auth, userCtrl.userProfile);
router.delete('/profile',   auth, userCtrl.deleteProfile)

module.exports = router;