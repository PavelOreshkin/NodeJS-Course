const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// Option 2: Passing a connection URI
const sequelize = new Sequelize('postgres://postgres:qwe@localhost:5432/task3');

sequelize.authenticate()
    .then(() => console.log('okey'));
// sequelize.close();

// const Users = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     login: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     age: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     isDeleted: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false
//     }
// }, {
//     timestamps: false,
//     schema: 'userSchema'
// });

// sequelize.sync()
//     .then(result => {
//         // console.log(result);
//     })
//     .catch(err => console.log(err));

// sequelize.sync({ force: true }).then(() => {
//     Users.create({
//         login: 'Paul3',
//         password: '111',
//         age: 11,
//         isDeleted: false
//     });
// });

// Users.findAll().then(users => {
//     // console.log(users);
//     console.log(users.map(user => console.log(user.toJSON())));
// });
