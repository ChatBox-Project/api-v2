import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ForgotPwDto {
  @IsNotEmpty()
  phoneNumber: string;
}
