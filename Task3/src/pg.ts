const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:qwe@localhost:5432/task3');

sequelize.authenticate().then(() => console.log('success connected'));

export const UsersTable: any = sequelize.define('user', {
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

// UsersTable.findAll().then((users: any) => {
//     users.map((user: any) => console.log(user.toJSON()));
// });
