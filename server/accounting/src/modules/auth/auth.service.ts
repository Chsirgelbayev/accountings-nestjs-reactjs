import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { configuration } from 'src/common/config/configuration';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.schema';
import { messages } from 'src/common/constants/messages.constant';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly usersSchema: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.usersSchema
            .findOne({
                email: loginDto.email
            })
            .select('+password');

        if (!user) {
            throw new UnauthorizedException(messages.MESG_INVALID_CREDENTIALS);
        }

        const isMatch: boolean = await user.comparePassword(loginDto.password);

        if (!isMatch) {
            throw new UnauthorizedException(messages.MESG_INVALID_PASSWORD);
        }

        return this.generateToken({
            id: user.id,
            name: user.name,
        });
    }

    async register(registerDto: RegisterDto) {
        const user = await this.usersSchema.create(registerDto);

        return this.generateToken({
            id: user.id,
            name: user.name,
        });
    }

    async generateToken(user) {
        const token: string = this.jwtService.sign(user);

        const cookieSettings: Record<string, Date | boolean | boolean> = {
            expires: new Date(
                Date.now() +
                    Number(configuration.JWT_COOKIE_EXPIRE) *
                        24 *
                        60 *
                        60 *
                        1000
            ),
            httpOnly: true
        };

        if (configuration.NODE_ENV === 'production') {
            cookieSettings.secure = true;
        }

        return {
            token,
            cookieSettings
        };
    }
}
