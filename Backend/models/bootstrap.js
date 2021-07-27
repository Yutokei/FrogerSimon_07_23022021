module.exports = async () => {
    const Post = require('./Post');
    const User = require('./User');

    User.hasMany(Post,  { as: 'Post', foreignKey: 'userId'});
    Post.belongsTo(User, { as:'User', foreignKey: 'userId'})

    const errHandler = err => {
        console.error("Error: ",err)
    }
}