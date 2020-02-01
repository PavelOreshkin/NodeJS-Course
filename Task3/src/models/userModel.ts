import { Sequelize, MyServer } from '../data-access';
import { UserModelStatic } from '../types';

export const UsersModel = <UserModelStatic>MyServer.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    schema: 'userSchema'
});
