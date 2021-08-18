'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    id: { 
            type:           DataTypes.INTEGER(11),
            allowNull:      false,
            autoIncrement:  true,
            primaryKey:     true,
    },
    postId: {type:          DataTypes.INTEGER(11),
            allowNull:     false
    },
    userUuid: {type:          DataTypes.INTEGER(11),
            allowNull:     false
    },
    Textcontent: {type:     DataTypes.STRING(300),
                  allowNull:false
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};