const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

module.exports = (req, res, next) => {
const token = req.headers["token"];

if (!token) return res.json({ error: "Utilisateur non authentifié" });

try {
  const validToken = jwt.verify(token, process.env.TOKEN_KEY);

  if (validToken) {
    return next();
  }
} catch (err) {
  return res.json({ error: err });
}
};