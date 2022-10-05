import { ConfigFactory } from '@nestjs/config';
import { IConfiguration } from 'src/common/types/configuration.type';

export const configuration: ConfigFactory = (): IConfiguration => ({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL,
    REQUEST_TIMEOUT_TIME: 1000,

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
