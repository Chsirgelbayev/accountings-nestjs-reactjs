import { registerAs } from '@nestjs/config';

export default registerAs('mongoose', () => ({
    uri: process.env.MONGODB_URL
}));
