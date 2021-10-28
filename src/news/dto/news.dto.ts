import { ApiProperty } from '@nestjs/swagger';

export class NewsDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;
  
  @ApiProperty()
  _tags: string[];
  
  @ApiProperty()
  created_at: Date;
  
  @ApiProperty()
  month: string;
}