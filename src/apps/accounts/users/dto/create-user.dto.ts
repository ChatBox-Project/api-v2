import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsPhoneNumber, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { EGender } from 'src/configs';

interface ICreateUserDto {
  name: string;
  gender: string;
  avatarUrl: string;
  birth_day: string;
}
export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: string;

  // @IsNotEmpty()
  // @MinLength(5)
  // @MaxLength(255)
  // @IsUrl()
  @ApiProperty()
  avatarUrl: string;

  // @IsNotEmpty()
  @ApiProperty()
  birth_day: string;

 
}
