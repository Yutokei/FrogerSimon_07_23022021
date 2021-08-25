const models = require('../models')
const Post = models.Post;
const Comment = models.Comment

exports.createPost= (req, res) => {
    const postObject = req.body;
    const post = new Post({
        ...postObject,
    })
    post.save()
        .then(() => res.status(201).json({ message: "C'est publié" }))
        .catch(error => res.status(400).json({ error }))

}

exports.getAllPosts = (req, res) => {
    let allPosts = "";
    Post.findAll({ 
        order: [["updatedAt", "DESC"]],
        include: Comment,
    })    
    .then(response => {
        allPosts = response
        res.status(200).json(allPosts)
    })
    .catch(error => {res.status(400).json({ error })})
    
}

exports.getAllPostsFromUser = (req, res) => {
    let listOfPosts = [];
    const uuid = req.headers.uuid;
    Post.findAll({
      where: { userUuid: uuid },
      order: [["updatedAt", "DESC"]],
      include: Comment,
    })
    .then((response)=>{
        listOfPosts = response;
        res.status(200).json(listOfPosts)})
    .catch(error => {
        res.status(400).json({ error })
    })
}

exports.updatePost= (req, res) => {
        const postObject = { ...req.body };
        Post.updateOne({ id: req.params.id }, { ...postObject, id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post modifié !' }))
            .catch(error => res.status(400).json({ error }));
}

exports.deletePost= (req, res) => {
    Post.findOne({ where: {postId: req.params.id}})
    .then((post)=>{
        if(post.userUuid === req.headers.uuid || req.headers.admin === "true"){
            Comment.destroy({where: {postId: req.params.id}})
            Post.destroy({where: { postId: req.params.id }})
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
            .catch((error) => {
                res.status(400).json({ error })
            })
        }else{
            res.status(401).json({ message: "Vous ne pouvez effacer que les posts dont vous êtes l'auteur"})
        }
    })
    .catch((error)=> res.status(400).json({ error }))

}