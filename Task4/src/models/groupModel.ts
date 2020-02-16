import { Sequelize, MyServer } from '../data-access';
import { GroupModelStatic } from 'groupTypes';

export const GroupModel = /* <GroupModelStatic> */ MyServer.define('Group', {
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
        type: Sequelize.ARRAY(Sequelize.TEXT) ,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'groupSchema'
});

GroupModel.associate = (models: any) => {
    GroupModel.belongsToMany(models.UsersModel, {
        through: 'UserGroup',
        as: 'Users',
        foreignKey: 'userId',
        otherKey: 'groupId'
    });
};
