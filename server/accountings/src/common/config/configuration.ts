import { ConfigFactory } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

export const configuration: ConfigFactory = () => ({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,

    MONGO_URL: process.env.MONGO_URL,

    JWT: {
        COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
        SECRET: process.env.JWT_SECRET,
        EXPIRE: process.env.JWT_EXPIRE
    },

    SWAGGER: {
        TITLE: 'accounting',
        DESCRIPTION: 'accounting description',
        VERSION: '0.0.1',
        PATH: '/documentation'
    }
});
