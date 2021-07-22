const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupomania', 'Simon', 'dwugdgB&fqnf', { host: 'localhost', dialect: 'mysql', operatorsAliases:false})

module.exports = sequelize
//Permet un usage global(sans import)
global.sequelize = sequelize;