import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Put,
    UseGuards
} from '@nestjs/common';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('/api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthJwtGuard)
    @Get()
    public async getAllUsers(): Promise<Object> {
        const users = await this.usersService.getAllUsers();

        return {
            success: true,
            data: users
        };
    }

    @UseGuards(AuthJwtGuard)
    @Get(':id')
    public async getUser(@Param('id') id: string): Promise<Object> {
        const user = await this.usersService.getUser(id);

        return {
            success: true,
            data: user
        };
    }

    @UseGuards(AuthJwtGuard)
    @Put(':id')
    @HttpCode(201)
    public async updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id') id: string
    ): Promise<Object> {
        const user = await this.usersService.updateUser(updateUserDto, id);

        return {
            success: true,
            data: user
        };
    }

    @UseGuards(AuthJwtGuard)
    @Delete(':id')
    @HttpCode(204)
    public async deleteUser(@Param('id') id: string): Promise<void> {
        return await this.usersService.deleteUser(id);
    }
}
