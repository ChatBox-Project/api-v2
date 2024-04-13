import { Body, Controller, Get, Post } from '@nestjs/common';
import { OtpService } from './otp.service';


@Controller('otp')
export class OtpController {
  constructor(private readonly _optSerivce: OtpService) {}
  @Post('generate')
  public async generateOtp(@Body() _req: any): Promise<any> {
    return await this._optSerivce.generateOtp(_req.phoneNumber);
  }

  // verify
  @Post('verify')
  public async verify(@Body() _req: any): Promise<any> {
    return await this._optSerivce.verifyOtp(_req.phoneNumber, _req.otp);
  }
}
