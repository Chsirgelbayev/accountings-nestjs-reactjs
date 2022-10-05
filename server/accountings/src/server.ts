import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { AllErrorsFilter } from './common/filters/all-exception.filter';

import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config/dist';
import { ConfigEnum } from './common/enums/config.enum';
import { nestConfig } from './config/nestjs.config';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

const bootstrap = async (): Promise<void> => {
    const app: INestApplication =
        await NestFactory.create<NestExpressApplication>(AppModule, nestConfig);

    const configService = app.get(ConfigService);

    const SWAGGER_CONFIG = configService.get(ConfigEnum.SWAGGER);
    const NODE_ENV = configService.get<string>(ConfigEnum.NODE_ENV);
    const PORT = configService.get<string>(ConfigEnum.PORT);

    if (NODE_ENV === ConfigEnum.DEVELOPMENT) {
        app.use(morgan(ConfigEnum.dev));
    }

    app
        .use(cookieParser())
        .useGlobalPipes(new ValidationPipe())
        .useGlobalFilters(new AllErrorsFilter())
        .useGlobalInterceptors(new TimeoutInterceptor(configService))

    const swaggerCfg = new DocumentBuilder()
        .setTitle(SWAGGER_CONFIG.TITLE)
        .setDescription(SWAGGER_CONFIG.DESCRIPTION)
        .setVersion(SWAGGER_CONFIG.VERSION)
        .build();

    const document = SwaggerModule.createDocument(app, swaggerCfg);
    SwaggerModule.setup(SWAGGER_CONFIG.PATH, app, document);

    await app.listen(PORT, async (): Promise<void> => {
        console.log(
            `Server running in ${NODE_ENV} mode on ${await app.getUrl()} HOST`
        );
    });
};

bootstrap();
