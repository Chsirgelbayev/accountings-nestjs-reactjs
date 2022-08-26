import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly password: string;
}
