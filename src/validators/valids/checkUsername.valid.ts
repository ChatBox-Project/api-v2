import { ErrorResponse } from 'src/errors';
import { BadRequestException } from '@nestjs/common';

export const checkUsername = (phoneNumber: string) => {
  const regexNumber = /^\d+\.?\d*$/;
  const isValidNumberPhone = (numberPhone: string): unknown => {
    return /((0[3|5|7|8|9])+([0-9]{8})|([+]84[3|5|7|8|9])+([0-9]{8}))\b/g.test(numberPhone);
  };
  try {
    if (regexNumber.test(phoneNumber)) {
      // console.log('Rex::', regexNumber.test(phoneNumber));

      if (isValidNumberPhone(phoneNumber)) {
        return true;
      } else {
        throw new ErrorResponse({
          ...new BadRequestException('Invalid phone number'),
          errorCode: 'INVALID_PHONE_NUMBER',
        });
      }
    } else {
      throw new ErrorResponse({
        ...new BadRequestException('Invalid phone number'),
        errorCode: 'INVALID_PHONE_NUMBER_Regex',
      });
    }
  } catch (error) {
    throw new ErrorResponse({ ...error, errorCode: error.errorCode });
  }
};
