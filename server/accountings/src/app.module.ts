import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigOptions } from './common/classes/mongoose.class';
import { AccountingsModule } from './modules/accountings/accountings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
import { configuration } from './config/configuration';

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
