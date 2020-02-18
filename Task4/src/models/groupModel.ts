import { Sequelize, MyServer } from '../data-access';
import { GroupModelStatic } from 'groupTypes';
import UserModel from './userModel';

const GroupModel = /* <GroupModelStatic> */ MyServer.define('Group', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'groupSchema'
});

// console.log('111');
// GroupModel.associate = (models: any) => {
//     console.log('XXX');
//     GroupModel.belongsToMany(models.UserModel, {
//         through: 'UserGroup',
//         as: 'Users',
//         foreignKey: 'groupId',
//         otherKey: 'userId'
//     });
// };
// console.log('222');

console.log('111');
GroupModel.belongsToMany(UserModel, {
    through: {
        model: 'UserGroup'
    },
    as: 'Users',
    foreignKey: 'groupId',
    otherKey: 'userId'
});
console.log('222');

export default GroupModel;
