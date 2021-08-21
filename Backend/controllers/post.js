const models = require('../models')
const Post = models.Post;
const User = models.User
const Comment = models.Commnent

exports.createPost= (req, res) => {
    console.log(req.body.postObject)
    const postObject = req.body.postObject;
    const post = new Post({
        ...postObject,
    })
    console.log(post)
    post.save()
        .then(() => res.status(201).json({ message: "C'est publié" }))
        .catch(error => res.status(400).json({ error }))

}

exports.getAllPosts = (req, res) => {
    let allPosts = "";
    Post.findAll({ 
        order: [["postId", "DESC"]],
    })    
    .then(response => {
        allPosts = response
        res.status(200).json(allPosts)
    })
    .catch(error => {res.status(400).json({ error })
    console.log(error)})
    
}

exports.getAllPostsFromUser = (req, res) => {
    let listOfPosts = "";
    const uuid = req.headers.uuid;
    Post.findAll({
      where: { userUuid: uuid },
    })
    .then((response)=>{
        listOfPosts = response;
        console.log(res)
        res.status(200).json(listOfPosts)})
    .catch(error => {
        console.log(error)
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
        Comment.destroy({where:{ postId: req.params.id}})
        Post.destroy({where:{ postId: req.params.id }})
          .then(() => res.status(200).json({ message: 'Post supprimée!' }))
          .catch(error => res.status(400).json({ error }));
}

exports.adminDeletePost = (req, res) => {
    if(req.query.isAdmin)
    {
        models.post.destroy({ where: { userId: req.params.id }})
        .then((res) => {res.status(200).json({ message: "Le post a été supprimé !" })})
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Vous ne disposez pas de droit administrateur "})
    }
}