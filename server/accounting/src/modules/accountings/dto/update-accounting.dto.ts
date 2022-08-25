import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAccountingDto {
    @IsNotEmpty()
    readonly body: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    @IsDateString()
    readonly date: Date;
}
