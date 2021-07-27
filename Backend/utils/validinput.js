const Joi = require('joi')

const userJoiSchema = joi.object().keys({
    username:   Joi.string().alphanum().min(3).max(30).required(),
    email:      Joi.string().alphanum().min(3).max(30).required(),
    password:   Joi.string().alphanum().min(3).max(30).required()
})

const result = Joi.validate(body , userJoiSchema);