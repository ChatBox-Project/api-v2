import { IsDate, IsNotEmpty, IsPhoneNumber, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { EGender } from 'src/configs';

interface ICreateUserDto {
  name: string;
  gender: EGender;
  avatarUrl: string;
  birth: Date;
}
export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  name: string;

  @IsNotEmpty()
  gender: EGender;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @IsUrl()
  avatarUrl: string;

  @IsNotEmpty()
  // @IsDate()
  birth: Date;
}
