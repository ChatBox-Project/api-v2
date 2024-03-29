import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers';
import { AuthService, UserService } from 'src/services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
