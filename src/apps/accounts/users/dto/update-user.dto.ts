import { ApiProperty } from '@nestjs/swagger';
import { EGender } from 'src/configs';

export class UpdateUserDto {
  @ApiProperty()
  name?: string;
  
  @ApiProperty()
  gender?: string;
  // @IsUrl()
  @ApiProperty()
  avatarUrl?: string;
  // @IsDate()
  @ApiProperty()
  birth_day?: string;
}
