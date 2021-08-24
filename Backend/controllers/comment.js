const models = require('../models');
const Comment = models.Comment;
const Post = models.Post
const User = models.User;

exports.createComment = (req, res) => {
    const commentObject = req.body
    const comment = new Comment({
            ...commentObject
        }
    )
    comment.save()
    .then(() => res.status(201).json({ message: "Post commenté !" }))
    .catch(error => res.status(400).json({ error }))
};

exports.deleteComment = (req, res, next) => {
    console.log(req.params)
    Comment.findOne({ where: {commentId: req.params.id}})
    .then((comment)=>{
        if(comment.userUuid === req.headers.uuid || req.headers.admin === "true"){
            Comment.destroy({where: { commentId: req.params.id }})
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
            .catch((error) => {
                console.log(error)
                res.status(400).json({ error })
            })
        }
    })
    .catch((error)=> res.status(400).json({ error }))

  };

  exports.adminDeleteComment = (req, res) => {
    if(req.query.isAdmin)
    {
        
        models.comment.destroy({ where: { id: req.params.commentId }})
        .then((res) => {res.status(200).json({ message: "L'utilisateur a été supprimé !" })})
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Vous ne disposez pas de droit administrateur "})
    }
}
exports.getAllComments = (req, res) =>{
    Post.findAll({include: Comment})
    .then((comments)=>{
        res.json(comments)})
    .catch((err)=> console.log(err))
}