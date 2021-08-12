const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Routage
router.post('/signup',                userCtrl.signup);
router.post('/login',                 userCtrl.login);
router.get('/logout',           auth, userCtrl.logout)

router.get('/',      auth, userCtrl.getAllProfiles);
router.get('/:id',          auth, userCtrl.userProfile);
router.delete('/:id',       auth, userCtrl.deleteProfile);

router.post('/login/admin',           userCtrl.login);
router.delete('/profile/admin', auth, userCtrl.adminDeleteProfile)

module.exports = router;