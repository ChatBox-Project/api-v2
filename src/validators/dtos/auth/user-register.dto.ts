import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @MinLength(8)
  @MaxLength(50)
  password: string;

  @MinLength(8)
  @MaxLength(50)
  passwordSalt: string;
}
