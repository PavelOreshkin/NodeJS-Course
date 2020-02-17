import { Sequelize, MyServer } from '../data-access';
import { UserModelStatic } from '../types/userTypes';
import { GroupModel } from './groupModel';

export const UserModel = /* <UserModelStatic> */ MyServer.define('User', {
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

UserModel.associate = (models: any) => {
    UserModel.belongsToMany(models.GroupModel, {
        through: 'UsersGroups',
        as: 'Groups',
        foreignKey: 'userId',
        otherKey: 'groupId'
    });
};

// UserModel.belongsToMany(GroupModel, {
//     through: 'UsersGroups',
//     as: 'Groups',
//     foreignKey: 'userId',
//     otherKey: 'groupId'
// });
