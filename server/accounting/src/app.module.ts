import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig } from './common/config/mongoConfig';
import { AccountingsModule } from './modules/accountings/accountings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
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
