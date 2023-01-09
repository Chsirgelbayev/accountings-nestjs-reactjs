import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    get accessToken(): string {
        return this.configService.get<string>('jwt.accessToken');
    }

    get refreshToken(): string {
        return this.configService.get<string>('jwt.refreshToken');
    }
    get secretAccessToken(): string {
        return this.configService.get<string>('jwt.accessToken.secret');
    }

    get expiresInAccessToken(): string {
        return this.configService.get<string>('jwt.accessToken.expiresIn');
    }

    get secretRefreshToken(): string {
        return this.configService.get<string>('jwt.refreshToken.secret');
    }

    get expiresInRefreshToken(): string {
        return this.configService.get<string>('jwt.refreshToken.expiresIn');
    }

    get cookieExpire(): string {
        return this.configService.get<string>('jwt.cookieExpire');
    }

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            secret: this.configService.get<string>('jwt.accessToken.secret'),
            signOptions: {
                expiresIn: this.configService.get<string>(
                    'jwt.accessToken.expiresIn'
                )
            }
        };
    }
}
