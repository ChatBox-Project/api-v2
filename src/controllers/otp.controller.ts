import { Body, Controller, Get, Post } from '@nestjs/common';
import { OtpService } from 'src/services';

@Controller('otp')
export class OtpController {
  constructor(private readonly _optSerivce: OtpService) {}
  @Post('generate')
  public async generateOtp(@Body() _req: any): Promise<any> {
    return await this._optSerivce.generateOtp(_req.phoneNumber);
  }

  // verify
  @Get('verify')
  public async verify(@Body() _req: any): Promise<any> {
    return await this._optSerivce.verifyOtp(_req.phoneNumber, _req.otp);
  }
}
