import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly login: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}
