// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';

// interface IMember {
//   userId: string;
// }
// export class ChatGroupCreateDto {
//   @ApiProperty()
//   @IsString()
//   name: string;

//   @ApiProperty()
//   @IsString()
//   description: string;

//   @ApiProperty()
//   @IsString()
//   avatarUrl: string;

//   @ApiProperty({ type: [IMember] }) 
//   @ValidateNested({ each: true }) 
//   @Type(() => IMember)
//   members: IMember[];
// }
