import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { News } from './entities/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsService],
  controllers: [NewsController],
})
// eslint-disable-next-line prettier/prettier
export class NewsModule { }
