import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AccountLoginDto {
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  @ApiProperty()
  phoneNumber: string;
  
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
