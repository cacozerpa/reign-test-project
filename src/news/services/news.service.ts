import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { News } from '../entities/news.entity';

@Injectable()
export class NewsService {
  // eslint-disable-next-line prettier/prettier
  constructor(@InjectRepository(News) private newsRepo: Repository<News>) { }

  async getNews() {
    const response = await axios.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );  

    const news = response.data.hits;

    return news;
  }

  findAll() {
    return this.newsRepo.find();
  }

  findOne(id: number) {
    return this.newsRepo.findOne(id);
  }

  async create() {
    try{
      const news = await this.getNews();

      news.map(async n => {
      if(n.title === null){
        n.title = 'Reign New ' + Math.floor(Math.random() * 10);
      }
      const newHit = new News();

      newHit.title = n.title;
      newHit.author = n.author;
      newHit._tags = n._tags;
      newHit.created_at = n.created_at;
      return this.newsRepo.save(newHit);

    })
    }catch(error){
      throw new error;
    }
  }

  async update(id: number, body: any) {
    const task = await this.newsRepo.findOne(id);
    this.newsRepo.merge(task, body);
    return this.newsRepo.save(task);
  }

  async delete(id: number) {
    await this.newsRepo.delete(id);
    return true;
  }
}
