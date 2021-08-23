'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Post.hasMany(models.Comment, {
          foreignKey:"postId",
          foreignKeyConstraint: true,
        onDelete: "cascade",
        hooks: true,
      })
      Post.hasOne(models.User, {
        foreignKey:"uuid",
        onDelete:"cascade"
      }) 
    }
  };
  Post.init({
    postId: { 
                  type:           DataTypes.INTEGER(11),
                  allowNull:      false,
                  autoIncrement:  true,
                  primaryKey:     true,
},  userUuid: {
                  type:          DataTypes.UUID,
                  allowNull:     false
},
    userName: {
                  type:          DataTypes.STRING(200),
                  allowNull:     false
    },
    textContent: {
                  type:     DataTypes.STRING(500),
                  allowNull:false
    },
    imageContent:{
                  type:     DataTypes.STRING(200)}
    }, 
  {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};