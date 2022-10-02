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
    GET_ME,
    GET_ME_SUCCESS,
    LOGIN,
    LOGIN_SUCCESS,
    REGISTER,
    REGISTER_SUCCESS,
    TAG
} from './auth.constants';
import { LoginResponse, RegisterResponse, GetMeResponse } from './auth.type';
import { AuthEnum } from './auth.enums';
import { AuthJwtGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from '../users/users.schema';
import { Response } from 'express';

@ApiTags(TAG)
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: LOGIN })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: LOGIN_SUCCESS,
        type: LoginResponse
    })
    @Post('login')
    public async login(
        @Body() loginDto: LoginDto,
        @Res() res: Response
    ): Promise<LoginResponse> {
        const tokenOptions = await this.authService.login(loginDto);

        res.cookie(
            AuthEnum.TOKEN,
            tokenOptions.token,
            tokenOptions.cookieSettings
        ).json({ success: true, token: tokenOptions.token });

        return {
            success: true,
            token: tokenOptions.token
        };
    }

    @ApiOperation({ summary: REGISTER })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: REGISTER_SUCCESS,
        type: RegisterResponse
    })
    @Post('register')
    public async register(
        @Body() registerDto: RegisterDto,
        @Res() res: Response
    ): Promise<RegisterResponse> {
        const tokenOptions = await this.authService.register(registerDto);

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

    @ApiOperation({ summary: GET_ME })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: GET_ME_SUCCESS,
        type: GetMeResponse
    })
    @Get('me')
    @UseGuards(AuthJwtGuard)
    public async getMe(
        @UserDecorator() user: User,
    ): Promise<GetMeResponse> {

        return {
            success: true,
            data: user
        };
    }
}
