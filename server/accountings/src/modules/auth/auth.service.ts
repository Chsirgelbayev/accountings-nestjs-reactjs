import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.schema';
import { ExceptionMessage } from 'src/common/enums/exception-message.enum';
import { ConfigService } from '@nestjs/config/dist';
import { ConfigEnum } from 'src/common/enums/config.enum';
import { CookieSettings, TokenOptions } from './auth.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,

        @InjectModel(User.name) private readonly usersSchema: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    public async login(loginDto: LoginDto): Promise<TokenOptions> {
        const user: User = await this.usersSchema
            .findOne({
                login: loginDto.login
            })
            .select('+password');

        if (!user) {
            throw new UnauthorizedException(ExceptionMessage.INVALID_CREDENTIALS);
        }

        const isMatch: boolean = await user.comparePassword(loginDto.password);

        if (!isMatch) {
            throw new UnauthorizedException(ExceptionMessage.INVALID_PASSWORD);
        }

        return this.generateToken({
            login: user.login,
            id: user.id,
        });
    }

    public async register(registerDto: RegisterDto): Promise<TokenOptions> {
        const user = await this.usersSchema.create(registerDto);

        return this.generateToken({
            login: user.login,
            id: user.id
        });
    }

    private async generateToken(user): Promise<TokenOptions> {
        const jwtConfig = this.configService.get(ConfigEnum.JWT);
        const NODE_ENV = this.configService.get(ConfigEnum.NODE_ENV)

        const token: string = this.jwtService.sign(user);

        const cookieSettings: CookieSettings= {
            expires: new Date(
                Date.now() +
                    Number(jwtConfig.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };

        if(NODE_ENV === ConfigEnum.PRODUCTION) {
            cookieSettings.secure = true
        }

        return {
            token,
            cookieSettings
        };
    }
}
