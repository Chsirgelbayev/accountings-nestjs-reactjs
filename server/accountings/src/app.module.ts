import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AccountingsModule } from './accountings/accountings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        AccountingsModule,

        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/config.env`,
            load: [configuration]
        }),
        DatabaseModule
    ]
})
export class AppModule {}
