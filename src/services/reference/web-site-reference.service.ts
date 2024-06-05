import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WebSiteReferenceService {


    constructor(private prismaService:PrismaService){}

    async GetWebSiteReference(){
             
        const uniqueWebsites = await this.prismaService.news.findMany({
           
            distinct: ['web_site']
          });
          
           const websites = uniqueWebsites.map(newsItem => newsItem.web_site);
          
          return websites 
    }
}
