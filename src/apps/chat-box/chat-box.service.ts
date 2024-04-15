import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResponseService } from '../../common/res';
import { ErrorResponse } from 'src/errors';

@Injectable()
export class ChatBoxService {}
