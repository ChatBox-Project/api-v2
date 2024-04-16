import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  // @IsNotEmpty()
  @ApiProperty()
  contentType: string;

  // @IsNotEmpty()
  @ApiProperty()
  content: string;


}
