import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AllErrorsFilter } from './shared/filters';
import { TimeoutInterceptor } from './shared/interceptors';

const bootstrap = async (): Promise<void> => {
    const app: INestApplication =
        await NestFactory.create<NestExpressApplication>(AppModule);

    const _configService = app.get(ConfigService);

    const NODE_ENV = _configService.get<string>('NODE_ENV');
    const PORT = _configService.get<string>('PORT');

    app.use(morgan('dev'));

    app.setGlobalPrefix('api/v1')

    app
        .use(cookieParser())
        .useGlobalPipes(new ValidationPipe())
        .useGlobalFilters(new AllErrorsFilter())
        .useGlobalInterceptors(new TimeoutInterceptor(_configService));

    // const swaggerCfg = new DocumentBuilder()
    //     .setTitle(SWAGGER_CONFIG.TITLE)
    //     .setDescription(SWAGGER_CONFIG.DESCRIPTION)
    //     .setVersion(SWAGGER_CONFIG.VERSION)
    //     .build();

    // const document = SwaggerModule.createDocument(app, swaggerCfg);
    // SwaggerModule.setup(SWAGGER_CONFIG.PATH, app, document);

    await app.listen(PORT, async (): Promise<void> => {
        Logger.log(
            `Server running in ${NODE_ENV} mode on ${await app.getUrl()} HOST`
        );
    });
};

void bootstrap();
