'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('posts', {
      postId: { 
              type:           DataTypes.INTEGER(11),
              allowNull:      false,
              autoIncrement:  true,
              primaryKey:     true,
      },
      userName: {
        type:          DataTypes.STRING(200),
        allowNull:     false
      },
      userUuid: {
              type:          DataTypes.UUID,
              allowNull:     false
      },
      textContent: {
              type:     DataTypes.STRING(500),
              allowNull:false
      },
      imageContent:{
              type:     DataTypes.STRING(200)},

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
    await queryInterface.dropTable('posts');
  }
};