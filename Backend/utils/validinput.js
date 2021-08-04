const Joi = require('joi')

const userJoiSchema = Joi.object().keys({
    userName:   Joi.string().alphanum().min(3).max(30).required(),
    email:      Joi.string().email().required(),
    password:   Joi.string().alphanum().min(5).max(30).required()
})

async function verifySignupInputs(userName, email, password){
try{
    const value = await userJoiSchema.validateAsync({ userName: userName, email: email, password: password })
}
catch(err){
    res.status(400).json({ error  });
}};