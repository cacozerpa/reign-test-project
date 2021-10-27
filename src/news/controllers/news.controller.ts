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

  @Get('a')
  async get() {
    const res = await axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
    return res.data.hits;
  }

  @Get('page/:page')
  async getAll(@Param('page') page: number) {
    return await this.newsService.findAll(page);
  }

  @Get('author')
  async getOne(@Body() body: any) {
    return await this.newsService.findOneByAuthor(body.author);
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
    }
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() body: any) {
  //   return this.newsService.update(id, body);
  // }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.newsService.delete(id);
  }
}
