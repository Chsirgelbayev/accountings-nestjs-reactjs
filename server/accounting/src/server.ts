import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { configuration } from './common/config/configuration';
import { swaggerConfig } from './common/config/swagger';
import { nestOptions } from './common/config/nest';
import { AllErrorsFilter } from './common/filters/errors.filter';

import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

const bootstrap = async () => {
    const app: INestApplication =
        await NestFactory.create<NestExpressApplication>(
            AppModule,
            nestOptions
        );

    if (configuration.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.use(cookieParser())
        .useGlobalPipes(new ValidationPipe())
        .useGlobalFilters(new AllErrorsFilter());

    const swaggerCfg = new DocumentBuilder()
        .setTitle(swaggerConfig.docsTitle)
        .setDescription(swaggerConfig.docsDescription)
        .setVersion(swaggerConfig.version)
        .build();

    const document = SwaggerModule.createDocument(app, swaggerCfg);
    SwaggerModule.setup(swaggerConfig.documentationPath, app, document);

    await app.listen(configuration.PORT, async (): Promise<void> => {
        console.log(
            `Server running in ${
                configuration.NODE_ENV
            } mode on ${await app.getUrl()} HOST`
        );
    });
};

bootstrap();
