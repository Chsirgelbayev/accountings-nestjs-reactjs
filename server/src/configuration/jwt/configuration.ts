import { registerAs } from "@nestjs/config";


export default registerAs('jwt', () => ({
    accessToken: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'bob',
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES || '1h'
    },
    refreshToken: {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'bob',
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES || '1d'
    },
    cookieExpire: process.env.JWT_COOKIE_EXPIRE || '1'
}))