import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { CookieSettings, TokenOptions } from './auth.interface';
import { JwtConfigService } from '@accountings/configuration';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly jwtConfigService: JwtConfigService,

        @InjectModel(User.name) private readonly usersSchema: Model<User>
    ) {}

    public async login(loginDto: LoginDto): Promise<TokenOptions> {
        const user: User = await this.usersSchema
            .findOne({
                login: loginDto.login
            })
            .select('+password');

        if (!user) {
            throw new UnauthorizedException('');
        }

        const isMatch: boolean = await user.comparePassword(loginDto.password);

        if (!isMatch) {
            throw new UnauthorizedException('');
        }

        return this.generateToken({
            login: user.login,
            id: user.id
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
        const token: string = this.jwtService.sign(user);

        const cookieSettings: CookieSettings = {
            expires: new Date(
                Date.now() +
                    Number(this.jwtConfigService.cookieExpire) *
                        24 *
                        60 *
                        60 *
                        1000
            ),
            httpOnly: true
        };

        return {
            token,
            cookieSettings
        };
    }
}
