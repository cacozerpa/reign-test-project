import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from '../services/news.service';

describe('NewsController', () => {
  let controller: NewsController;

  const mockNewsService = {
    //TODO: Complete This
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [NewsService]
    }).overrideProvider(NewsService).useValue(mockNewsService).compile();

    controller = module.get<NewsController>(NewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
