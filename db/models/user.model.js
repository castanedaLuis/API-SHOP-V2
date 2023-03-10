const { Model, DataTypes, Sequelize } = require('sequelize');

//nombre de la tabla
const USER_TABLE = 'users';

//schema que valida la estructura de nuestra tabla
const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      recoveryToken: {
        allowNull: true,
        field: 'recovery_token',
        type: DataTypes.STRING
      },
      role:{
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
}

class User extends Model{

    /**
     * Metodos staticos quieren decir que no necesitamos 
     * hacer una instancia del objeto para acceder a ellos
     */

    static associate(models) {
      this.hasOne(models.Customer, {
        as: 'customer',
        foreignKey: 'userId'
      });
    }
    
      static config(sequelize) {
        return {
          sequelize,
          tableName: USER_TABLE,
          modelName: 'User',
          timestamps: false
        }
      }
}


module.exports = { USER_TABLE, UserSchema, User }