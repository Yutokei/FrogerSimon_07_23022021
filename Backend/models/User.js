const Sequelize = require('sequelize');

module.exports = sequelize.define('User', {
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
    isAdmin:   {type:        Sequelize.BOOLEAN}
})