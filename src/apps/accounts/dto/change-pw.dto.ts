import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePwDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @IsString()
  @ApiProperty()
  pw: string;
}
