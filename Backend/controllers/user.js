const Joi =         require('../utils/validinput')
let bcrypt =        require('bcrypt');
let jwtUtils =      require('../utils/jwt.utils');
let models =        require('../models');
const cryptoJs =    require('crypto-js')
require('dotenv').config

exports.signup = (req, res) => {

    Joi.verifySignupInputs(req.body.userName, req.body.email, req.body.password);
    bcrypt
        .hash(req.body.pasword, 10)
        .then(hash => {
            const user = models.User.create({
                email: cryptoJs.HmacSHA256(req.body.email, process.env.CRYPTO_KEY).toString(),
                userName: req.body.userName,
                password: hash,
            });
            user
                .then(() => { res.status(201).json({ message: "Vous êtes enregistré !" })})
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
}

exports.login = (req, res) => {
    models.user.findOne({ email: cryptoJs.HmacSHA256(req.body.email, process.env.CRYPTO_KEY).toString() })
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
                userName: user.userName,
                role: user.isAdmin,
                token: jwtUtils.generateToken(user.id),
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

    exports.userProfile = (req, res) => {
        const userProfile = {}
        const uuid = req.params.uuid
        models.user.findOne({ where: { uuid }})
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

    exports.getAllProfiles = (req, res) => {
        models.user.findAll()
        .then((users) => { res.status(200).json(users)})
        .catch((error) => { res.status(400).json({message: error})})
    }

exports.deleteProfile = (req, res) => {
    models.user.findOne({ id: req.params.id })
    .then(() => {
        models.user.destroy({ where: { userId: req.params.id }})
        models.Post.destroy({ where: { userId: req.params.id }})
        user.destroy({ where: { id: req.params.id }}) 
        .then( () => res.status(204).json({message: "Utilisateur supprimé"}))
        .catch(error => res.status(400).json(error))
    })
    .catch(error => res.status(500).json({ error }));
}

exports.adminDeleteProfile = (req, res) => {
    if(req.query.isAdmin)
    {
        models.user.destroy({ where: { id: req.query.uid}})
        models.post.destroy({ where: { userId: req.query.uid }})
        medels.comment.destroy({ where: { userId: req.query.uid }})
        .then((res) => {res.status(200).json({ message: "L'utilisateur a été supprimé !" })})
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Vous ne disposez pas de droit administrateur "})
    }
}