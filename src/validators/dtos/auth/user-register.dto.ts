import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  passwordSalt: string;
}
