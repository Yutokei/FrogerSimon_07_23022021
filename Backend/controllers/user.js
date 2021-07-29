const Joi =         require('joi')
let bcrypt =        require('bcrypt');
let jwtUtils =      require('../utils/jwt.utils');
let models =        require('../models');
const cryptoJs =    require('crypto-js')
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
    if (!valid) { res.status(422).json({ message: 'Invalid request', data: body })}

    bcrypt
        .hash(req.body.pasword, 10)
        .then(hash => {
            const user = models.User.create({
                email: cryptoJs.HmacSHA256(req.body.email, process.env.CRYPTO_KEY).toString(),
                username: req.body.username,
                password: hash,
                isAdmin: false,
            });
            user
                .then(() => { res.status(201).json({ message: "Vous êtes enregistré !" })})
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
}

exports.login = (req, res) => {
    models.User.findOne({ email: cryptoJs.HmacSHA256(req.body.email, process.env.CRYPTO_KEY).toString() })
    .then(user => {
        if (!user)  {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            res.status(200).json({
                userId: user.id,
                token: jwtUtils.generateToken(user.id),
                isAdmin: user.isAdmin
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

    exports.userProfile = (req, res) => {
        const uuid = req.params.uuid
        models.User.findOne({
            attributes: ['uuid', 'email', 'username', 'profilePicture', 'isAdmin'],
            where: { uuid }
        })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(500).json(error))
    };


exports.deleteProfile = (req, res) => {
    models.User.findOne({ id: req.params.id })
    .then(() => {
        models.User.destroy({ where: { UserId: req.params.id }})
        models.Post.destroy({ where: { UserId: req.params.id }})
        User.destroy({ where: { id: req.params.id }}) 
        .then( () => res.status(204).json({message: "Utilisateur supprimé"}))
        .catch(error => res.status(400).json(error))
    })
    .catch(error => res.status(500).json({ error }));
}