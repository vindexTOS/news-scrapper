import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryDto } from 'src/DTO/news-query-dto';
@Injectable()
export class ApiService {
  constructor(private prismaService: PrismaService) {}

  async GetNews(query: QueryDto, page= 1, pageSize = 10) {

    const {search,website,date} = query
    const skip = (Number(page) - 1) * Number(pageSize);

    const data = await this.prismaService.news.findMany({
      orderBy: {
        createdAt : date,
      },
        where: {
          
            ...(search && { OR: [{ title: { contains: search } }, { text: { contains: search } }] }),
            ...(website && { website:{contains:"web_site"}}),
        
        },       
       
        skip,
        take: Number(pageSize),  
      });     

       const total = await this.prismaService.news.count({})
      const totalPages = Math.ceil(total / pageSize);

    return { data, pagination: { page, pageSize, total, totalPages }, status: 200 };
  }
}
