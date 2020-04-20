export const databaseConfig = {
    serverOwner: process.env.DB_SERVER_OWNER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dbName: process.env.DB_NAME
};

export const jwtExpireTime = 3600;

export const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
