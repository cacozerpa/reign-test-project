import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('simple-array')
  _tags: string[];

  @Column()
  created_at: Date;

  @Column()
  month: string;
}
