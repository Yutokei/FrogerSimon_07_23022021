const models = require("../models");
const Comment = models.Comment;
const Post = models.Post;

exports.createComment = (req, res) => {
  const commentObject = req.body;
  const comment = new Comment({
    ...commentObject,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Post commenté !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { commentId: req.params.id } })
    .then((comment) => {
      if (
        comment.userUuid === req.headers.uuid ||
        req.headers.admin === "true"
      ) {
        Comment.destroy({ where: { commentId: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "Commentaire supprimé !" })
          )
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
