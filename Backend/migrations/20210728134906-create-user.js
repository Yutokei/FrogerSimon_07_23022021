'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
uuid:       {type: DataTypes.UUID,
            allowNull:      false,
            defaultValue: DataTypes.UUIDV4
},
userId:         {type: DataTypes.INTEGER(11),
            allowNull:      false,
            autoIncrement:  true,
            primaryKey:     true,
},
email:      {type:       DataTypes.STRING,
            allowNull:   false,
            unique:     true
},
userName:  {type:       DataTypes.STRING,
            allowNull:   false,
            unique:     true
},
password:  {type:        DataTypes.STRING,
            allowNull:   false
},
isAdmin:   {type:        DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
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
    await queryInterface.dropTable('users');
  }
};