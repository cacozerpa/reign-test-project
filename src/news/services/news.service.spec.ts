import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { News } from '../entities/news.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('NewsService', () => {
  let service: NewsService;

  const mockNewsRepo = {
    //TODO: Complete This
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsService, {
        provide: getRepositoryToken(News),
        useValue: mockNewsRepo
      }],
      
    }).compile();

    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
