'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('comments', {
      id: { 
              type:           DataTypes.INTEGER(11),
              allowNull:      false,
              autoIncrement:  true,
              primaryKey:     true,
      },
      postId: {type:          DataTypes.INTEGER(11),
              allowNull:     false
      },
      userId: {type:          DataTypes.INTEGER(11),
              allowNull:     false
      },
      Textcontent: {type:     DataTypes.STRING(300),
                    allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};