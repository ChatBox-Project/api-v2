import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ForgotPwDto {
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
}
