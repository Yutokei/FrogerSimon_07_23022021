const Sequelize = require('sequelize');

module.exports = sequelize.define('Post', {
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
    ImageContent: Sequelize.STRING(200)
})