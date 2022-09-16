import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig } from './common/config/mongo.config';
import { AccountingsModule } from './modules/accountings/accountings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
import { configuration } from './common/config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MongoConfig
        }),
        AuthModule,
        UsersModule,
        AccountingsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
