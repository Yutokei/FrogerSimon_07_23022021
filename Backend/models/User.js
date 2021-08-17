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
      User.hasMany(models.Post, {
        onDelete: "cascade",
      })
    }
    toJSON(){
      return { ...this.get(), id: undefined}
    }
  };
  User.init({
    uuid:       {type: DataTypes.UUID,
                allowNull:      false,
                defaultValue: DataTypes.UUIDV4
    },
    id:         {type: DataTypes.INTEGER(11),
                allowNull:      false,
                autoIncrement:  true,
                primaryKey:     true,
   },
    email:      {type:       DataTypes.STRING,
                allowNull:   false,
                unique:      false
    },
    userName:  {type:       DataTypes.STRING,
                allowNull:   false,
                unique:      true
    },
    password:  {type:        DataTypes.STRING,
                allowNull:   false
    },
    isAdmin:   {type:        DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};