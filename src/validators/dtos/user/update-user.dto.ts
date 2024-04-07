import { EGender } from 'src/configs';

export class UpdateUserDto {
  name: string;
  gender: EGender;
  // @IsUrl()
  avatarUrl: string;
  // @IsDate()
  birth: Date;
}
