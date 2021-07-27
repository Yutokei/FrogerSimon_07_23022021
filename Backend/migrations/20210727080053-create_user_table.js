'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("user",  {
      id: { 
        type: Sequelize.INTEGER(11),
        allowNull:      false,
        autoIncrement:  true,
        primaryKey:     true,
},
    email:      {type:       Sequelize.STRING,
                allowNull:   false,
                unique:     false
            },
    username:  {type:       Sequelize.STRING,
                allowNull:   false,
                unique:     true
            },
    password:  {type:        Sequelize.STRING,
                allowNull:   false
            },
    isAdmin:   {type:        Sequelize.BOOLEAN},
    createdAt:               Sequelize.DATE,
    updatedAt:               Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user");
  }
};
