'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
uuid:       {type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
},
id:         {type: DataTypes.INTEGER(11),
        allowNull:      false,
        autoIncrement:  true,
        primaryKey:     true,
},
email:      {type:       DataTypes.STRING,
        allowNull:   false,
        unique:     false
},
username:  {type:       DataTypes.STRING,
        allowNull:   false,
        unique:     true
},
password:  {type:        DataTypes.STRING,
        allowNull:   false
},
isAdmin:   {type:        DataTypes.BOOLEAN
},
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
    await queryInterface.dropTable('users');
  }
};