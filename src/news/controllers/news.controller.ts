// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import axios from 'axios';
import { NewsService } from './../services/news.service';

@Controller('api/news')
export class NewsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private newsService: NewsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('a')
  async get() {
    const res = await axios.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    return res.data.hits;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('title')
  async getOneByTitle(@Body() body: any) {
    return await this.newsService.findByTitle(body.title);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('page/:page')
  async getAll(@Param('page') page: number) {
    return await this.newsService.findAll(page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('author')
  async getOneByAuthor(@Body() body: any) {
    return await this.newsService.findOneByAuthor(body.author);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tags')
  async getByTags(@Body() body: any) {
    return await this.newsService.findByTags(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('date')
  async getByDate(@Body() body: any) {
    return await this.newsService.findByDate(body.date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create() {
    await this.newsService.create();

    return {
      status: 200,
      message: 'New created successfully!',
    };
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() body: any) {
  //   return this.newsService.update(id, body);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.newsService.delete(id);
  }
}
