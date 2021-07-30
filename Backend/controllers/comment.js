const models = require('../models');
const Comment = models.Comment;
const User = models.user;

exports.createComment = (req, res) => {
    const comment = new Comment(
        {
            UserId:     req.body.UserId,
            postId:     req.body.postId,
            Textcontent:req.body.Textcontent
        }
    )
    comment.save()
    .then(() => res.status(201).json({ message: "Post commenté !" }))
    .catch(error => res.status(400).json({ error }))
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll()
    .then(comments => { res.status(200).json(comments) })
    .catch(error => res.status(400).json({ error }))
};

exports.deleteComment = (req, res, next) => {
          Coment.deleteOne({ id: req.params.id })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
            .catch(error => res.status(400).json({ error }));
  };