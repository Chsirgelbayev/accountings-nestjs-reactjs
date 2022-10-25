import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    LoginResponse,
    RegisterResponse,
    GetMeResponse
} from './auth.interface';
import { Auth, AuthSwagger } from './auth.enum';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/users.schema';
import { Response } from 'express';
import { UserDecorator } from 'src/users/decorators/user.decorator';


@ApiTags(AuthSwagger.TAG)
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @ApiOperation({ summary: AuthSwagger.LOGIN })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: AuthSwagger.LOGIN_SUCCESS,
        type: LoginResponse
    })
    @Post('login')
    public async login(
        @Body() loginDto: LoginDto,
        @Res() res: Response
    ): Promise<LoginResponse> {
        const tokenOptions = await this._authService.login(loginDto);

        res.cookie(
            Auth.TOKEN,
            tokenOptions.token,
            tokenOptions.cookieSettings
        ).json({ success: true, token: tokenOptions.token });

        return {
            success: true,
            token: tokenOptions.token
        };
    }

    @ApiOperation({ summary: AuthSwagger.REGISTER })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: AuthSwagger.REGISTER_SUCCESS,
        type: RegisterResponse
    })
    @Post('register')
    public async register(
        @Body() registerDto: RegisterDto,
        @Res() res: Response
    ): Promise<RegisterResponse> {
        const tokenOptions = await this._authService.register(registerDto);

        res.cookie(
            'token',
            tokenOptions.token,
            tokenOptions.cookieSettings
        ).json({ success: true, token: tokenOptions.token });

        return {
            success: true,
            token: tokenOptions.token
        };
    }

    @ApiOperation({ summary: AuthSwagger.GET_ME })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: AuthSwagger.GET_ME_SUCCESS,
        type: GetMeResponse
    })
    @Get('me')
    @UseGuards(AuthJwtGuard)
    public async getMe(@UserDecorator() user: User): Promise<GetMeResponse> {
        return {
            success: true,
            data: user
        };
    }
}
