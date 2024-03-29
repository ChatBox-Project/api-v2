import { IsDate, IsNotEmpty, IsPhoneNumber, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { EGender } from 'src/configs';

interface ICreateUserDto {
  firstName: string;
  lastName: string;
  phone: number;
  sex: EGender;
  avatarUrl: string;
  birth: Date;
}
export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: number;

  @IsNotEmpty()
  sex: EGender;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @IsUrl()
  avatarUrl: string;

  @IsNotEmpty()
  @IsDate()
  birth: Date;
}
