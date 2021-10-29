import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class News {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column('varchar', { array: true })
  _tags: string[];

  @ApiProperty()
  @Column()
  created_at: Date;

  @ApiProperty()
  @Column()
  month: string;
}
