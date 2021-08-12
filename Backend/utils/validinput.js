const Joi = require('joi')

const userJoiSchema = data =>{
    const schema = Joi.object({
    userName:   Joi.string().alphanum().min(3).max(30).required(),
    email:      Joi.string().email().required(),
    password:   Joi.string().alphanum().min(5).max(30).required()
}).unknown();

return schema.validate(data);
}

module.exports.userJoiSchema = userJoiSchema