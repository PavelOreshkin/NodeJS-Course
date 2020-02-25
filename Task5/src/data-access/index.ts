import { serverConfig } from '../config';
const { serverOwner, password, host, port, dbName } = serverConfig;

export const Sequelize = require('sequelize');
export const MyServer = new Sequelize(`postgres://${serverOwner}:${password}@${host}:${port}/${dbName}`);
export const Op = Sequelize.Op;
export const dbInit = (message: string): void => {
    MyServer.authenticate().then(() => console.log(message));
};
