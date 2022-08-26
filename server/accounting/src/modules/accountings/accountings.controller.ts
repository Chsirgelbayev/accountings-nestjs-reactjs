import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthJwtGuard } from '../auth/auth.guard';
import { AccountingsService } from './accountings.service';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';

@Controller('api/v1/accountings')
export class AccountingsController {
    constructor(private readonly accountingsService: AccountingsService) {}

    @UseGuards(AuthJwtGuard)
    @Get()
    public async findAllAccountings(@Request() req): Promise<Object> {
        const accountings = await this.accountingsService.findAllAccountings(
            req.user.id
        );

        return {
            success: true,
            data: accountings
        };
    }

    @UseGuards(AuthJwtGuard)
    @Post()
    public async createAccounting(
        @Body() createAccountingDto: CreateAccountingDto,
        @Request() req
    ): Promise<Object> {
        req.body.userId = req.user.id;

        const accounting = await this.accountingsService.createAccounting(
            createAccountingDto
        );

        return {
            success: true,
            data: accounting
        };
    }

    @UseGuards(AuthJwtGuard)
    @Put(':id')
    @HttpCode(201)
    public async updateAccounting(
        @Param('id') id: string,
        @Body() updateAccountingDto: UpdateAccountingDto
    ): Promise<Object> {
        const accounting = await this.accountingsService.updateAccounting(
            id,
            updateAccountingDto
        );

        return {
            success: true,
            data: accounting
        };
    }

    @UseGuards(AuthJwtGuard)
    @Delete(':id')
    @HttpCode(204)
    public async deleteAccounting(@Param('id') id: string): Promise<void> {
        return await this.accountingsService.deleteAccounting(id);
    }
}
