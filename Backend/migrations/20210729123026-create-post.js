'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('posts', {
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
              type:     DataTypes.STRING(200)},

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};