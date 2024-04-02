import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AccountRegisterDto {
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  phoneNumber: string;

  @MinLength(8)
  @MaxLength(50)
  password: string;
}
