const { userJoiSchema } = require("../utils/validinput");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.User;
const jwt_decode = require("jwt-decode");
require("dotenv").config;

exports.signUp = (req, res, next) => {
  const { error } = userJoiSchema(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new models.User({
          userName: req.body.userName,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({ message: "Vous êtes enregistré !" });
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.signIn = (req, res) => {
  const userEmail = req.body.email;
  models.User.findOne({ where: { email: userEmail } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe invalide" });
          }

          const maxAge = "3h";

          const createToken = (uuid, userName, isAdmin) => {
            return jwt.sign(
              { uuid: uuid, userName: userName, admin: isAdmin },
              process.env.TOKEN_KEY,
              {
                expiresIn: maxAge,
              }
            );
          };

          const token = createToken(user.uuid, user.userName, user.isAdmin);
          res.status(202).json({
            message: "Bienvenue " + user.userName,
            uuid: user.uuid,
            admin: user.isAdmin,
            userName: user.userName,
            token: token,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
  res.status(200).send("Utilisateur-rice déconnecté-e");
};

exports.userProfile = (req, res) => {
  let userProfile = [];

  const uuid = req.params.id;
  User.findOne({ where: { uuid } })
    .then((user) => {
      userProfile = {
        userName: user.dataValues.userName,
        userEmail: user.dataValues.email,
        userRole: user.dataValues.isAdmin,
        createdAt: user.dataValues.createdAt,
      };
      res.status(200).json(userProfile);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getAllProfiles = (req, res) => {
  let allUsers = [];
  User.findAll({
    where: { isAdmin: false },
    order: [["updatedAt", "DESC"]],
  })
    .then((users) => {
      allUsers = users;
      res.status(200).json(allUsers);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.deleteProfile = (req, res) => {
  models.User.findOne({ where: { uuid: req.params.id } })
    .then((user) => {
      if (user.uuid === req.params.id || req.headers.admin === "true") {
        models.Comment.destroy({ where: { userUuid: req.params.id } });
        models.Post.destroy({ where: { userUuid: req.params.id } });
        models.User.destroy({ where: { uuid: req.params.id } })
          .then(() => res.status(204).json({ message: "Utilisateur supprimé" }))
          .catch((error) => res.status(400).json(error));
      } else {
        res
          .status(401)
          .json({ message: "Vous ne disposez pas des droits utilisateurs" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.validateToken = (req, res) => {
  const token = jwt_decode(req.headers.token);
  models.User.findOne({ where: { uuid: token.uuid } })
  .then((user) => {
    res.status(200).json({
      uuid: user.uuid,
      admin: user.isAdmin,
      userName: user.userName,
    });
  })
  .catch((error) =>{
    res.status(400).json({
      error
    })
  })
};
