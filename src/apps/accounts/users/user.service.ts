import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/common/entities/account.entity';
import { ErrorResponse } from 'src/errors';

import { ResponseService } from '../../../common/res';
import { UserEntity } from 'src/common/entities/user.base.entity';
import { AccountRepository } from '../account.repository';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
 
}
