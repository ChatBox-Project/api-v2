import { EGender } from 'src/configs';

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  gender: EGender;
  // @IsUrl()
  avatarUrl: string;
  // @IsDate()
  birth: Date;
}
