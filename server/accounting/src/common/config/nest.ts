import { NestApplicationOptions } from '@nestjs/common';

export const nestOptions: NestApplicationOptions = {
    logger: ['warn', 'error']
};
