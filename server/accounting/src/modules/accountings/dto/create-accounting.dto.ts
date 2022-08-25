import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAccountingDto {
    @IsOptional()
    readonly userId: string;

    @IsNotEmpty()
    readonly body: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    @IsDateString()
    readonly date: Date;
}
