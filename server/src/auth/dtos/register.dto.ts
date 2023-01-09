import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly login: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly password: string;
}
