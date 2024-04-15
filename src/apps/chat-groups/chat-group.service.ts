import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ErrorResponse } from 'src/errors';

@Injectable()
export class ChatGroupService {}
