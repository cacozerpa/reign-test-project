import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

import { News } from '../entities/news.entity';

@Injectable()
export class NewsService {
  // eslint-disable-next-line prettier/prettier
  constructor(@InjectRepository(News) private newsRepo: Repository<News>) { }

  convertDate(date: Date) {
    return date.toLocaleString('en-US', {month: 'long'}).toLowerCase();
  }

  convertTags(tags: string) {
    if(Array.isArray(tags)){
      return tags;
    }

    return tags?.trim().length > 0 ? tags.split(',') : [];
  }

  async getNews() {
    const response = await axios.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );

    const news = response.data.hits;

    return news;
  }

  async findAll(page = 1) {
    try{
    const news = await this.newsRepo.find({
      skip: 5 * (page - 1),
      take: 5,
    });

    return {
      status: 200,
      message: 'News Found!',
      data: news,
    }
    }catch(err){
      throw new Error('No News Found!');
    }
    
  }

  async findOneByAuthor(author: string, page = 1) {
    try {
      const news = await this.newsRepo.find({ where: { author: author },
       skip: 5 * (page - 1),
       take: 5,
      });

      return {
        status: 200,
        message: 'News Found!',
        data: news,
      };
    } catch (error) {
      throw new Error('No news found under this author!');
    }
  }

  async findByTitle(body: any) {
    try {
      const res = await this.newsRepo.find({ where: { title: body } });

      return {
        status: 200,
        message: 'News found!',
        data: res,
      };
    } catch (error) {
      throw new Error('No news found under this title!');
    }
  }

  async findByDate(month: string, page = 1) {
    try {
    const res = await this.newsRepo.find({ where:{
      month: month},
      skip: 5 * (page - 1),
      take: 5,
    });

    return res;
    } catch (error) {
      throw new Error('Error finding under this date');
    }
  }

  async findByTags(tags: string) {
    try{
      
      const values: string[] = this.convertTags(tags);

      const res = await this.newsRepo.createQueryBuilder('news').where('news._tags @> (:_tags)::varchar[]', {_tags: values}).getMany()

      return {
        status: 200,
        message: 'News Found!',
        data: res
      };
    }catch(error){

      throw new Error(error);
    }
    
  }

  async create() {
    try {
      const news = await this.getNews();

      news.map(async (n: any) => {
        const newHit = new News();

        newHit.title = n.title ? n._highlightResult.title.value : n.story_title;
        newHit.author = n.author;
        newHit._tags = n._tags;
        newHit.created_at = n.created_at;
        newHit.month = this.convertDate(new Date (n.created_at));
        const res = this.newsRepo.save(newHit);

        return {
          status: 200,
          message: 'News Created Successfully!'
        }
      });
    } catch (error) {
      throw new Error('Creating news!');
    }
  }

  async delete(id: number) {
    try{

    await this.newsRepo.delete(id);

    return {
      status: 200,
      message: 'New Deleted!'
    };

    }catch(error) {
      throw new Error('Error Deleting New!')
    }
    
  }

  @Cron(CronExpression.EVERY_HOUR)
    async updateNews() {
      await this.create();
    }
  
}
