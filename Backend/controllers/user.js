const Joi = require('joi')
let bcrypt = require('bcrypt');
let jwt = require('../utils/jwt.utils');
let models = require('../models');
const cryptoJs = require('crypto-js')
require('dotenv').config

exports.signup = (req, res) => {
    const { body } = req;

    const userJoiSchema = joi.object().keys({
        username:   Joi.string().alphanum().min(3).max(30).required(),
        email:      Joi.string().email.required(),
        password:   Joi.string().alphanum().min(3).max(30).required()
    })

    const result = Joi.validate(body, userJoiSchema);

    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
      res.status(422).json({ 
        message: 'Invalid request', 
        data: body 
      })

}

exports.login = (req, res) => {
    
}

exports.userProfile = (req, res) => {

}

exports.deleteProfile = (req, res) => {

}

exports.changePassword = (req, res) => {
    
};