import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, usersSchema } from '../users/users.schema';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { PropertyPath } from 'src/common/enums/property-path.enum';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (
                configService: ConfigService
            ): Promise<object> => ({
                secret: configService.get(PropertyPath.JWT).SECRET,
                signOptions: {
                    expiresIn: configService.get(PropertyPath.JWT).EXPIRE
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
