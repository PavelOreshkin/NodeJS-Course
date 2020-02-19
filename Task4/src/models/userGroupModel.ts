import { Sequelize, MyServer } from '../data-access';
// import { UserModelStatic } from '../types/userTypes';

export const UserGroupModel = /* <UserModelStatic> */ MyServer.define('UsersGroups', {
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
            model: 'Group',
            key: 'id'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    schema: 'ProjectSchema'
});
