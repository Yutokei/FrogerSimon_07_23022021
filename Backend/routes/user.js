const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Routage
router.post('/signup',                userCtrl.signup);
router.post('/login',           auth, userCtrl.login);
router.get('/logout',           auth, userCtrl.logout)

router.get('/allProfiles',      auth, userCtrl.getAllProfiles);
router.get('/profile',          auth, userCtrl.userProfile);
router.delete('/profile',       auth, userCtrl.deleteProfile);

router.post('/login/admin',     auth, userCtrl.login);
router.delete('/profile/admin', auth, userCtrl.adminDeleteProfile)

module.exports = router;