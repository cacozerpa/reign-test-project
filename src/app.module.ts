import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'user',
      password: '12345',
      database: 'my_db',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      retryDelay: 3000,
      retryAttempts: 3,
    }),
    NewsModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
