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
      // define association here
    }
  };
  Post.init({
    id: { 
                  type:           DataTypes.INTEGER(11),
                  allowNull:      false,
                  autoIncrement:  true,
                  primaryKey:     true,
},
    userId: {
                  type:          DataTypes.INTEGER(11),
                  allowNull:     false
    },
    Textcontent: {
                  type:     DataTypes.STRING(500),
                  allowNull:false
    },
    ImageContent:{
                  type:     DataTypes.STRING(200)}
    }, 
  {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};