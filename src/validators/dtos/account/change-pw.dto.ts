import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class changePwDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @IsString()
  pw: string;
  
}
