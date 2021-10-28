import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4000,
      username: 'user',
      password: '12345',
      database: 'my_db',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      retryDelay: 3000,
      retryAttempts: 3,
    }),
    NewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
