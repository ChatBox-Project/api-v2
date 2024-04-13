import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/common/entities/account.entity';
import { ErrorResponse } from 'src/errors';

import { Twilio } from 'twilio';
import { ResponseService } from '../../common/res';
import { AccountRepository } from '../accounts/account.repository';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    // private readonly twilio: Twilio,
    private readonly _respone: ResponseService,
  ) {}

  public async generateOtp(phoneNumber: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    // console.log('otp:: ', otp, 'expiry:: ', expiry);
    try {
      const account = await this._accountRepository.findOne({ where: { phoneNumber: phoneNumber } });

      if (!account) {
        throw new ErrorResponse({
          ...new BadRequestException('PhoneNumber is not exist'),
          errorCode: 'PHONENUMBER_NOT_EXIST',
        });
      }
      await this._accountRepository.update(account.id, { otp: otp, verificationExpires: expiry });

      // send otp
      // this.twilio.messages.create({
      // body: otp,
      // to: phoneNumber,
      // from: process.env.TWILIO_PHONE_NUMBER,
      // });

      console.log('otp::', otp, 'expiry::', expiry);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'OTP_DID_NOT_SEND',
      });
    }
  }

  public async verifyOtp(phoneNumber: string, otp: string): Promise<unknown> {
    try {
      const account = await this._accountRepository.findOne({ where: { phoneNumber: phoneNumber } });
      if (!account) {
        throw new ErrorResponse({
          ...new BadRequestException('PhoneNumber is not exist'),
          errorCode: 'PHONENUMBER_NOT_EXIST',
        });
      }

      if (account.otp !== otp) {
        throw new ErrorResponse({
          ...new BadRequestException('OTP is incorrect'),
          errorCode: 'OTP_INCORRECT',
        });
      }

      if (account.verificationExpires < new Date()) {
        throw new ErrorResponse({
          ...new BadRequestException('OTP is expired'),
          errorCode: 'OTP_EXPIRED',
        });
      }

      const result = await this._accountRepository.update(account.id, { verified: true });
      // res
      if (!result) {
        throw new ErrorResponse({
          ...new BadRequestException('OTP is incorrect'),
          errorCode: 'OTP_INCORRECT',
        });
      }

      const metatdata = { message: 'Verify successfully', verify: true };
      const res = await this._respone.createResponse(200, 'OK', metatdata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'OTP_INCORRECT',
      });
    }
  }
}
