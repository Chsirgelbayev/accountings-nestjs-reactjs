import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { User } from '../users/users.schema';
import { Accounting } from './accountings.schema';
import { AccountingsService } from './accountings.service';
import {
    CreateAccountingResponse,
    GetAllAccountingsResponse,
    UpdateAccountingResponse
} from './accountings.interface';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';

@Controller('api/v1/accountings')
export class AccountingsController {
    constructor(private readonly accountingsService: AccountingsService) {}

    @Get()
    @UseGuards(AuthJwtGuard)
    public async getAllAccountings(
        @UserDecorator() user: User
    ): Promise<GetAllAccountingsResponse> {
        const accountings: Accounting[] = await this.accountingsService.findAll(
            user.id
        );

        return {
            success: true,
            data: accountings
        };
    }

    @Post()
    @UseGuards(AuthJwtGuard)
    public async createAccounting(
        @UserDecorator() user: User,
        @Body() createAccountingDto: CreateAccountingDto
    ): Promise<CreateAccountingResponse> {
        const accounting: Accounting = await this.accountingsService.create({
            ...createAccountingDto,
            userId: user.id
        });

        return {
            success: true,
            data: accounting
        };
    }
    @Put(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(201)
    public async updateAccounting(
        @Param('id') id: string,
        @Body() updateAccountingDto: UpdateAccountingDto
    ): Promise<UpdateAccountingResponse> {
        const accounting: Accounting = await this.accountingsService.update(
            id,
            updateAccountingDto
        );

        return {
            success: true,
            data: accounting
        };
    }

    @Delete(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteAccounting(@Param('id') id: string): Promise<void> {
        return await this.accountingsService.delete(id);
    }
}
