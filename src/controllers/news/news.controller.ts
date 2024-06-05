import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { NewsService } from '../../services/SCRAPPER/news.service';
import { CreateNews } from '../../DTO/news-dto';
import { ApiService } from 'src/services/API/api.service';
import { QueryDto } from 'src/DTO/news-query-dto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private apiService: ApiService,
  ) {}

  @Post('create')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async WriteNews(@Body() requestBody: CreateNews) {
    return  await this.newsService.WriteNews(requestBody);
  }

  @Get('')
  @HttpCode(200)
  async GetNews(@Query(new ValidationPipe({ transform: true })) queryDto: QueryDto,
  @Query('page') page = 1,
  @Query('pageSize') pageSize = 10,) {
    return await this.apiService.GetNews(queryDto,page,pageSize);
  }

   
}
 