import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountRepository } from 'src/repositories';

export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AccountEntity) private readonly _repository: AccountRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      // find the account by token
      const findAccount = await this._repository.findOne({ where: { keyToken: token } });
      if (!findAccount) {
        throw new UnauthorizedException('Token not found');
      }
      
      // const payload = await this.jwtService.verifyAsync(token,)
      return true;
    } catch (error) {}
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
