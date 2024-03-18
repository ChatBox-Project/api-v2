import { ErrorRespone } from 'src/errors';
import { isValidEmail } from './email.valid';
import { BadRequestException } from '@nestjs/common';
import { isValidNumberPhone } from './numberPhone.valid';

export const checkUsername = (username: string) => {
  const regexNumber = /^\d+\.?\d*$/;

  try {
    if (regexNumber.test(username)) {
      return isValidEmail(username);
    } else if (regexNumber.test(username)) {
      return isValidNumberPhone(username);
    } else {
      throw new ErrorRespone({ ...new BadRequestException('Username is invalid'), errorCode: 'USERNAME_INVALID' });
    }
  } catch (error) {
    throw new ErrorRespone({ ...error, errorCode: error.errorCode });
  }
};
