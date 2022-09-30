import { NestApplicationOptions } from '@nestjs/common';

export const nestConfig: NestApplicationOptions = {
    logger: ['warn', 'error']
};
