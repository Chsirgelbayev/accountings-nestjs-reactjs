import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule, JwtConfigService } from '@accountings/configuration';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, usersSchema } from '../users/schemas/user.schema';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useClass: JwtConfigService
        }),
        JwtConfigModule,
        MongooseModule.forFeature([{ name: User.name, schema: usersSchema }])
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [JwtModule]
})
export class AuthModule {}
