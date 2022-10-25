import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Model } from 'mongoose';
import { User } from '../users/users.schema';
import { ConfigService } from '@nestjs/config/dist';
import { PropertyPath, ExceptionMessage } from '../common/enums';
import { CookieSettings, TokenOptions } from './auth.interface';
import { production } from 'src/common/constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly _configService: ConfigService,

        @InjectModel(User.name) private readonly _usersSchema: Model<User>,
        private readonly _jwtService: JwtService
    ) {}

    public async login(loginDto: LoginDto): Promise<TokenOptions> {
        const user: User = await this._usersSchema
            .findOne({
                login: loginDto.login
            })
            .select('+password');

        if (!user) {
            throw new UnauthorizedException(
                ExceptionMessage.INVALID_CREDENTIALS
            );
        }

        const isMatch: boolean = await user.comparePassword(loginDto.password);

        if (!isMatch) {
            throw new UnauthorizedException(ExceptionMessage.INVALID_PASSWORD);
        }

        return this.generateToken({
            login: user.login,
            id: user.id
        });
    }

    public async register(registerDto: RegisterDto): Promise<TokenOptions> {
        const user = await this._usersSchema.create(registerDto);

        return this.generateToken({
            login: user.login,
            id: user.id
        });
    }

    private async generateToken(user): Promise<TokenOptions> {
        const jwtConfig = this._configService.get(PropertyPath.JWT);
        const NODE_ENV = this._configService.get(PropertyPath.NODE_ENV);

        const token: string = this._jwtService.sign(user);

        const cookieSettings: CookieSettings = {
            expires: new Date(
                Date.now() +
                    Number(jwtConfig.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };

        if (NODE_ENV === production) {
            cookieSettings.secure = true;
        }

        return {
            token,
            cookieSettings
        };
    }
}
