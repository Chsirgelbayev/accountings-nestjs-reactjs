import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { configuration } from 'src/common/config/configuration';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, usersSchema } from '../users/users.schema';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { ConfigEnum } from 'src/common/enums/config.enum';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService): Promise<object> => ({
                secret: config.get(ConfigEnum.JWT).SECRET,
                signOptions: {
                    expiresIn: config.get(ConfigEnum.JWT).EXPIRE
                }
            })
        }),
        MongooseModule.forFeature([{ name: User.name, schema: usersSchema }])
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [JwtModule]
})
export class AuthModule {}
