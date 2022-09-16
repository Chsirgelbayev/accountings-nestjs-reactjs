import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.schema';
import { messages } from 'src/common/constants/messages.constants';
import { ConfigService } from '@nestjs/config/dist';
import { ConfigEnum } from 'src/common/enums/config.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,

        @InjectModel(User.name) private readonly usersSchema: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    public async login(loginDto: LoginDto) {
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
            name: user.name
        });
    }

    public async register(registerDto: RegisterDto) {
        const user = await this.usersSchema.create(registerDto);

        return this.generateToken({
            id: user.id,
            name: user.name
        });
    }

    private async generateToken(user) {
        const jwtConfig = this.configService.get(ConfigEnum.JWT);

        const token: string = this.jwtService.sign(user);

        const cookieSettings: Record<string, Date | boolean | boolean> = {
            expires: new Date(
                Date.now() +
                    Number(jwtConfig.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };

        return {
            token,
            cookieSettings
        };
    }
}
