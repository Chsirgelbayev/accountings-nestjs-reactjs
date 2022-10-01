import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    Response,
    UseGuards
} from '@nestjs/common';
import { AuthJwtGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(
        @Body() loginDto: LoginDto,
        @Response() res
    ): Promise<void> {
        const tokenOptions = await this.authService.login(loginDto);

        res.cookie(
            'token',
            tokenOptions.token,
            tokenOptions.cookieSettings
        ).json({ success: true, token: tokenOptions.token });
    }

    @Post('register')
    public async register(
        @Body() registerDto: RegisterDto,
        @Response() res
    ): Promise<void> {
        const tokenOptions = await this.authService.register(registerDto);

        res.cookie(
            'token',
            tokenOptions.token,
            tokenOptions.cookieSettings
        ).json({ success: true, token: tokenOptions.token });
    }

    @Get('me')
    @UseGuards(AuthJwtGuard)
    public async getMe(@Request() req): Promise<object> {
        return {
            success: true,
            data: req.user
        };
    }
}
