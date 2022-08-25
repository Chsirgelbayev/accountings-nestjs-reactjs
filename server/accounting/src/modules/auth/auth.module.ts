import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { configuration } from 'src/common/config/configuration';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, usersSchema } from '../users/users.schema';

@Module({
    imports: [
        JwtModule.register({
            secret: configuration.JWT_SECRET,
            signOptions: {
                expiresIn: configuration.JWT_EXPIRE
            }
        }),
        MongooseModule.forFeature([{ name: User.name, schema: usersSchema }])
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [JwtModule]
})
export class AuthModule {}
