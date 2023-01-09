import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accounting, IAccounting } from './schemas/accounting.schema';
import { CreateAccountingDto } from './dtos/create-accounting.dto';
import { UpdateAccountingDto } from './dtos/update-accounting.dto';

@Injectable()
export class AccountingsService {
    constructor(
        @InjectModel(Accounting.name)
        private readonly _accountingsSchema: Model<IAccounting>
    ) {}

    public async findAll(id: string): Promise<Accounting[]> {
        const accountings: Accounting[] = await this._accountingsSchema.find({
            userId: id
        });

        if (!accountings.length) {
            throw new NotFoundException('');
        }

        return accountings;
    }

    public async create(
        createAccountingDto: CreateAccountingDto
    ): Promise<Accounting> {
        return await this._accountingsSchema.create(createAccountingDto);
    }

    public async update(
        id: string,
        updateAccountingDto: UpdateAccountingDto
    ): Promise<Accounting> {
        const accounting: Accounting =
            await this._accountingsSchema.findByIdAndUpdate(
                id,
                updateAccountingDto,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!accounting) {
            throw new NotFoundException('');
        }

        return accounting;
    }

    public async delete(id: string) {
        const accounting: Accounting =
            await this._accountingsSchema.findByIdAndDelete(id);

        if (!accounting) {
            throw new NotFoundException('');
        }
    }
}
