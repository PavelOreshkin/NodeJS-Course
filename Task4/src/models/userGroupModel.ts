import { Sequelize, MyServer } from '../data-access';
import UserModel from './userModel';
import GroupModel from './groupModel';
import { UserModelStatic } from '../types/userTypes';

export const UserGroupModel = <UserModelStatic> MyServer.define('usersGroups', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'group',
            key: 'id'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    schema: 'ProjectSchema'
});

UserModel.belongsToMany(GroupModel, {
    through: 'usersGroups',
    as: 'groups',
    foreignKey: 'userId',
    otherKey: 'groupId'
});

GroupModel.belongsToMany(UserModel, {
    through: 'usersGroups',
    as: 'users',
    foreignKey: 'groupId',
    otherKey: 'userId'
});
