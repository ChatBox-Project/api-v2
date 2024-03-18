import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;
}
