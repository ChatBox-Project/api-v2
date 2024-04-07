import { ApiProperty } from '@nestjs/swagger';
import { EGender } from 'src/configs';

export class UpdateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: EGender;
  // @IsUrl()
  @ApiProperty()
  avatarUrl: string;
  // @IsDate()
  @ApiProperty()
  birth: Date;
}
