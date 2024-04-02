import { IsNotEmpty } from 'class-validator';

export class AccountLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
