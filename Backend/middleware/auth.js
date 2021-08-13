const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

module.exports = (req, res, next) => {
const token = req.cookies.jwt;
if (token) {
  jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken)=> {
    if (err) {
      res.local.user = null;
      res.cookies("jwt", "", {maxAge: 1});
      next();
    } else {
      let user = await User.findById(decodedToken);
      res.locals.user = user;
      next();
    }
  })
} else {
  res.locals.user = null;
  next();
}
};