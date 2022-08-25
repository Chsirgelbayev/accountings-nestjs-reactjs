import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

export const configuration = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,

    MONGO_URL: process.env.MONGO_URL,

    JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE
};
