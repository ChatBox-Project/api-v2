import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AccountLoginDto {
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  phoneNumber: string;

  @IsNotEmpty()
  password: string;
}
