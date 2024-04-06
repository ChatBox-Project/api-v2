import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ForgotPwDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phoneNumber: string;
}
