import { ErrorResponse } from 'src/errors';
import { isValidEmail } from './email.valid';
import { BadRequestException } from '@nestjs/common';
import { isValidNumberPhone } from './numberPhone.valid';

export const checkUsername = (username: string) => {
  const regexNumber = /^\d+\.?\d*$/;

  try {
    if (username.includes('@')) {
      if (isValidEmail(username)) {
        return true;
      } else {
        throw new ErrorResponse({ ...new BadRequestException('Email is invalid'), errorCode: 'EMAIL_INVALID' });
      }
    } else if (!regexNumber.test(username)) { 
      if (isValidNumberPhone(username)) {
        return true;
      } else {
        throw new ErrorResponse({ ...new BadRequestException('Phone number is invalid'), errorCode: 'PHONE_INVALID' });
      }
    } else {
      throw new ErrorResponse({ ...new BadRequestException('Email or NumberPhone Invalid!'), errorCode: 'USERNAME_INVALID' });
    }
  } catch (error) {
    throw new ErrorResponse({ ...error, errorCode: error.errorCode });
  }
};
