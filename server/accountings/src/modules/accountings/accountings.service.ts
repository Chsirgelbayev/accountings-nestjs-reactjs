import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messages } from 'src/common/constants/messages.constants';
import { Accounting, IAccounting } from './accountings.schema';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';

@Injectable()
export class AccountingsService {
    constructor(
        @InjectModel(Accounting.name)
        private readonly accountingsSchema: Model<IAccounting>
    ) {}

    public async findAllAccountings(id: string): Promise<Accounting[]> {
        const accountings = await this.accountingsSchema.find({
            userId: id
        });

        if (!accountings.length) {
            throw new NotFoundException(messages.MESG_ACCOUNTINGS_NOT_FOUND);
        }

        return accountings;
    }

    public async createAccounting(
        createAccountingDto: CreateAccountingDto
    ): Promise<Accounting> {
        return await this.accountingsSchema.create(createAccountingDto);
    }

    public async updateAccounting(
        id: string,
        updateAccountingDto: UpdateAccountingDto
    ): Promise<Accounting> {
        const accounting = await this.accountingsSchema.findByIdAndUpdate(
            id,
            updateAccountingDto,
            {
                new: true,
                runValidators: true
            }
        );

        if (!accounting) {
            throw new NotFoundException(messages.MESG_ACCOUNTING_NOT_FOUND);
        }

        return accounting;
    }

    public async deleteAccounting(id: string) {
        const accounting = await this.accountingsSchema.findByIdAndDelete(id);

        if (!accounting) {
            throw new NotFoundException(messages.MESG_ACCOUNTING_NOT_FOUND);
        }
    }
}
