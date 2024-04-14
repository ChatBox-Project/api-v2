import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @ApiProperty()
  messageType: string;

  @IsNotEmpty()
  @ApiProperty()
  messageContent: string;
}
