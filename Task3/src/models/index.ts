export const Sequelize = require('sequelize');
export const MyServer = new Sequelize('postgres://postgres:qwe@localhost:5432/task3');
export const Op = Sequelize.Op;

MyServer.authenticate().then(() => console.log('db success connected'));
