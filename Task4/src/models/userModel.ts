import { Sequelize, MyServer } from '../data-access';
import { UserModelStatic } from '../types/userTypes';
import GroupModel from './groupModel';

const UserModel = /* <UserModelStatic> */ MyServer.define('User', {
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
    schema: 'ProjectSchema'
});

// console.log('333');
// UserModel.associate = (models: any) => {
//     console.log('YYY');
//     UserModel.belongsToMany(models.GroupModel, {
//         through: 'UsersGroups',
//         as: 'Groups',
//         foreignKey: 'userId',
//         otherKey: 'groupId'
//     });
// };
// console.log('444');

console.log('333');
UserModel.belongsToMany(GroupModel, {
    through: {
        model: 'UsersGroups'
    },
    as: 'Groups',
    foreignKey: 'userId',
    otherKey: 'groupId'
});
console.log('444');

export default UserModel;
