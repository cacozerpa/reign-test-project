import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import axios from 'axios';

import { NewsService } from './../services/news.service';

@Controller('api/news')
export class NewsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private newsService: NewsService) { }

  @Get()
  getAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Post()
  async create() {
    const res = await this.newsService.create();
    if(res === null){
      return {
        status: 500,
        message: 'Error Creating New!'
      }
    }

    return {
      status: 200,
      message: 'New created successfully!',
      data: res
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.newsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.newsService.delete(id);
  }
}
