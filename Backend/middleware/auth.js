const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

module.exports = (req, res, next) => {
const token = req.headers["token"];
if (token) {
  jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken)=> {
    if (err) {
      res.json({auth: false, message: "échec de l'authentification"});
      next();
    } else {
        req.user = decodedToken.userName
        res.json({ message: "Vous êtes authentifié-e"})
      next();
    }
  })
} else {
  res.send("Vous n'êtes pas connecté")
  next();
}
};