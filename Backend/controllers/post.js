const models = require('../models')
const Post = models.Post;
const User = models.User
const Comment = models.Commnent
const fs = require('fs');

exports.createPost= (req, res) => {
    const userName = req.userId.userName
    const postObject = JSON.parse(req.body.post);
    const post = new Post({
        ...postObject,
        userName: userName,
        imageContent: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    post.save()
        .then(() => res.status(201).json({ message: "C'est publié" }))
        .catch(error => res.status(400).json({ error }))

}

exports.getAllPosts = (req, res) => {
    Post.findAll({
        include: { model: User, required: true, attributes: ["userName"]}, 
        order: [["id", "DESC"]],
    })    
    .then(posts => {
        const postList = posts.map(post => {
            return Object.assign({},
                {
                    id:             post.id,
                    createdAt:      post.createdAt,
                    textcontent:    post.textcontent,
                    imageContent:   post.imageContent,
                    userName:       post.User.userName,
                }
            )
        })
        res.status(200).json({ postList })
    })
    .catch(error => res.status(400).json({ error }))
    
}

exports.getAllPostsFromUser = (req, res) => {
    const uuid = req.headers.uuid;
    const listOfPosts = Post.findAll({
      where: { userUuid: uuid },
    })
    .then(()=>res.json(listOfPosts))
    .catch(error => res.status(404).json({ error }))
}

exports.updatePost= (req, res) => {
    if (req.file) {
        Post.findOne({ id: req.params.id })
            .then(post => {
                // si l'image est modifiée, on supprime l'image actuel
                const filename = post.imageContent.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // une fois que l'ancienne image est supprimée dans le dossier /image, on peut mettre à jour le reste de l'objet
                    const postObject = {
                        ...JSON.parse(req.body.post),
                        imageContent: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Post.updateOne({ id: req.params.id }, { ...postObject, id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        // si l'image n'est pas modifiée
        const postObject = { ...req.body };
        Post.updateOne({ id: req.params.id }, { ...postObject, id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post modifié !' }))
            .catch(error => res.status(400).json({ error }));
    }
}

exports.deletePost= (req, res) => {
    Post.findOne({ id: req.params.id })
    .then(post => {
      const filename = post.imageContent.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimée!' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
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