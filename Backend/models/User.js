'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return { ...this.get(), id: undefined}
    }
  };
  User.init({
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
    isAdmin:   {type:        DataTypes.BOOLEAN}
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};