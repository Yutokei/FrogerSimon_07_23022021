const jwt = require('jsonwebtoken')
require('dotenv').config

const JWT_SIGN_SECRET = process.env.TOKEN_KEY

module.exports = {
     generateToken : (userData) => {
        return jwt.sign(
            {userId: userData},
            JWT_SIGN_SECRET,
            {
                expiresIn: '24h'
            })
    }
}