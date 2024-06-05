import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
 
import { PrismaService } from './prisma/prisma.service';
 import { PrismaModule } from './prisma/prisma.module';
import { NewsController } from './controllers/news/news.controller';
import {ReferenceControllerController } from "./controllers/reference.controller/reference.controller.controller"
import { NewsService } from './services/SCRAPPER/news.service';
import { ApiService } from './services/API/api.service';
import { ExeptionMiddleware } from './Middlewares/exception.middleware';
import { WebSiteReferenceService } from './services/reference/web-site-reference.service';
 
@Module({
  imports: [PrismaModule],
  controllers: [ NewsController , ReferenceControllerController ],
  providers: [PrismaService, NewsService, ApiService, WebSiteReferenceService  ],
})
export class AppModule   implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExeptionMiddleware )
      .forRoutes({path:'news', method: RequestMethod.GET});
  }
}


// forRoutes({ path: 'ab*cd', method: RequestMethod.ALL }); wild card
 