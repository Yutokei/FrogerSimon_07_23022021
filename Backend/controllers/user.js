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
        password:   Joi.string().alphanum().min(5).max(30).required()
    })

    const result = Joi.validate(body, userJoiSchema);

    const { value, error } = result;
    console.log(value);
    const valid = error == null; 
    if (!valid) { res.status(422).json({ message: 'Invalid request', data: body })}

    bcrypt
        .hash(req.body.pasword, 10)
        .then(hash => {
            const user = models.User.create({
                email: cryptoJs.HmacSHA256(req.body.email, process.env.CRYPTO_KEY).toString(),
                username: req.body.username,
                password: hash,
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
        const userProfile = {}
        const uuid = req.params.uuid
        models.User.findOne({ where: { uuid }})
            .then(user => {
                userProfile.userName = user.userName
                userProfile.email = user.email
                userProfile.isAdmin = user.isAdmin
            })
            .catch(error => res.status(500).json(error))
        models.post.findAll({ where: { uuid } })
            .then((userPosts) => { res.status(200).json(userPosts)})
            .catch((error) => { res.status(404).json({ error })})
    };

    exports.getAllProfile = (req, res) => {
        models.user.findAll()
        .then((users) => { res.status(200).json(users)})
        .catch((error) => { res.status(400).json({message: error})})
    }

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

exports.adminDeleteProfile = (req, res) => {
    if(req.query.isAdmin)
    {
        models.user.destroy({ where: { id: req.query.uid}})
        models.post.destroy({ where: { UserId: req.query.uid }})
        medels.comment.destroy({ where: { UserId: req.query.uid }})
        .then((res) => {res.status(200).json({ message: "L'utilisateur a été supprimé !" })})
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Vous ne disposez pas de droit administrateur "})
    }
}