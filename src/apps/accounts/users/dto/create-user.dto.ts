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
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  avatarUrl: string;

  // @IsNotEmpty()
  @ApiProperty()
  birth_day: string;
}
