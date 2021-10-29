// eslint-disable-next-line prettier/prettier
import { Controller, Get, Param, Post, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import axios from 'axios';
import { NewsService } from './../services/news.service';

@Controller('api/news')
export class NewsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private newsService: NewsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('hits')
  @ApiBearerAuth()
  async get() {
    const res = await axios.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    return res.data.hits;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('title')
  @ApiBearerAuth()
  async getOneByTitle(@Query('title') title: string) {
    return await this.newsService.findByTitle(title);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all/:page')
  @ApiBearerAuth()
  async getAll(@Param('page') page: number) {
    return await this.newsService.findAll(page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('author')
  @ApiBearerAuth()
  async getOneByAuthor(
    @Query('author') author: string,
    @Query('page') page: number,
  ) {
    return await this.newsService.findOneByAuthor(author, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tags')
  @ApiBearerAuth()
  async getByTags(@Query('tags') tags: string, @Query('page') page: number) {
    return await this.newsService.findByTags(tags, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('date')
  @ApiBearerAuth()
  async getByDate(@Query('date') date: string, @Query('page') page: number) {
    return await this.newsService.findByDate(date, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  async create() {
    return await this.newsService.create();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth()
  delete(@Param('id') id: number) {
    return this.newsService.delete(id);
  }
}
