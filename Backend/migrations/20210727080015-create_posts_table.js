'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("post", {
      id: { 
        type:           Sequelize.INTEGER(11),
        allowNull:      false,
        autoIncrement:  true,
        primaryKey:     true,
},
      userId: {type:          Sequelize.INTEGER(11),
              allowNull:     false
      },
      Textcontent: {type:     Sequelize.STRING(500),
                    allowNull:false
      },
      ImageContent:            Sequelize.STRING(200),
      createdAt:               Sequelize.DATE,
      updatedAt:               Sequelize.DATE,
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("post");
  }
};
