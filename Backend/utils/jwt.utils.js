const jwt = require('jsonwebtoken')
require('dotenv').config

const JWT_SIGN_SECRET = process.env.TOKEN_KEY

module.exports = {
     generateToken : (id) => {
        return jwt.sign(
            {id},
            JWT_SIGN_SECRET,
            {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })
    }
}