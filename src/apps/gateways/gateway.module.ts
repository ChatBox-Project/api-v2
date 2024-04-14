import { Module } from '@nestjs/common';
import { Gateway } from './gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [Gateway],
  exports: [Gateway],
})
export class GatewayModule {}
