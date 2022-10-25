import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountingsModule } from './accountings/accountings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseConfigOptions } from './common/classes';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/config.env`,
            load: [configuration]
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MongooseConfigOptions
        }),
        AuthModule,
        UsersModule,
        AccountingsModule
    ]
})
export class AppModule {}
