const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:qwe@localhost:5432/task3');

sequelize.authenticate()
    .then(() => console.log('okey'));

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

// sequelize.sync()
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => console.log(err));

// sequelize.sync().then((value) => {
//     UsersTable.create({
//         login: 'Paul1',
//         password: '111',
//         age: 11
//     });
// }).catch(err => console.log(err));

// UsersTable.create({
//     login: 'Paul2',
//     password: '2',
//     age: 2
// });

UsersTable.findAll().then((users: any) => {
    // console.log(users);
    console.log(users.map((user: any) => console.log(user.toJSON())));
});

// sequelize.close()
//     .then(() => console.log('Closed'))
//     .catch(err => console.error('Close connection error: ', err));
