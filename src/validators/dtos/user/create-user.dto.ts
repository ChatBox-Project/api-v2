import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: EGender;

  // @IsNotEmpty()
  // @MinLength(5)
  // @MaxLength(255)
  @IsUrl()
  @ApiProperty()
  avatarUrl: string;

  @IsNotEmpty()
  @ApiProperty()
  // @IsDate()
  birth: Date;
}
