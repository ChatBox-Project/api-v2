import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @ApiProperty()
  messageType: string;

  //   @IsNotEmpty()
  @ApiProperty()
  contentText: string;

  //   @IsNotEmpty()
  @ApiProperty()
  contentImage?: string;

  //   @IsNotEmpty()
  @ApiProperty()
  contentAudio?: string;

  //   @IsNotEmpty()
  @ApiProperty()
  contentVideo?: string;

  //   @IsNotEmpty()
  @ApiProperty()
  contentFile?: string;
}
