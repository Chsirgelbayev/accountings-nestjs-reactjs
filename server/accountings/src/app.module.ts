import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountingsModule } from './modules/accountings/accountings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseConfigOptions } from './classes';
import { configuration } from './config';

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
