// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import axios from 'axios';
import { NewsService } from './../services/news.service';
import { NewsDTO } from '../dto/news.dto'

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
  @Get('title/:title')
  @ApiBearerAuth()
  async getOneByTitle(@Param('title') title: string) {
    const newTitle = title.replace(/_/g, ' ');

    return await this.newsService.findByTitle(newTitle);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all/:page')
  @ApiBearerAuth()
  async getAll(@Param('page') page: number) {
    return await this.newsService.findAll(page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':author/:page')
  @ApiBearerAuth()
  async getOneByAuthor(@Param('author') author : string, @Param('page') page : number ) {
    return await this.newsService.findOneByAuthor(author, page);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tags/:tags')
  @ApiBearerAuth()
  async getByTags(@Param('tags') tags: string) {
    const newTags = tags.replace(/-/g, ',');
    return await this.newsService.findByTags(newTags);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('date/:date/:page')
  @ApiBearerAuth()
  async getByDate(@Param('date') date: string, @Param('page') page : number) {
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
