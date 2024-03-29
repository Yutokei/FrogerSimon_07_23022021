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
      Comment.belongsTo(models.Post,{
        foreignKeyConstraint: true,
        foreignKey: "postId",
        onDelete: "cascade"
      })
    }
  };
  Comment.init({
    commentId: { 
            type:           DataTypes.INTEGER(11),
            allowNull:      false,
            autoIncrement:  true,
            primaryKey:     true,
    },
    postId: {type:          DataTypes.INTEGER(11),
            allowNull:     false
    },
    userName: {type:          DataTypes.STRING(200),
      allowNull:     false
},
    userUuid: {type:          DataTypes.UUID,
            allowNull:     false
    },
    textContent: {type:     DataTypes.STRING(300),
                  allowNull:false
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};