import { Header, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNews } from '../../DTO/news-dto';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import * as cron from 'node-cron';
import * as cheerio from 'cheerio';
import { BADFAMILY } from 'dns';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}
  
  async WriteNews(requestBody: CreateNews) {
    try {
        // console.log(requestBody)
 console.log(requestBody.web_site)
      await this.prismaService.news.create({ data: requestBody });

      return { message: 'New Movie Created', status: HttpStatus.CREATED };
    } catch (error) {
        console.log(error)
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async startScraping() {
    cron.schedule('*/1 * * * *', async () => {
      await this.TabulaScrapper();
       await this.OnGeScrapper()
      await this.RadioFreedomeScrapper()
    });
  }
  u

// radio svaboda

async RadioFreedomeScrapper(){
   const url = 'https://www.radiotavisupleba.ge/news'
  const response = await this.GetRequestAxios(url)
  const $ =  cheerio.load(response)
  const mediaBlock = $(".media-block-wrap .row ul:first" )
  const link = mediaBlock.find('a').attr('href');
  // inner page 
  const article = await this.GetRequestAxios(`https://www.radiotavisupleba.ge/${link}`)
  const $$ = cheerio.load(article)
  const header = $$(".title").text()
  const image = $$(".media-image .img-wrap img").attr("src")
  const text = $$("#article-content p").text()
 
 
  const Body = {
    web_site: 'radiotavisupleba.ge',
    title: header.trim(),
    text: text.split("\n").join(""),
    image,
    date: new Date().toString(),
  };
  const isArtcleExist = await this.FindArtcle(header.trim());
  if (!isArtcleExist) {
    await this.WriteNews(Body);
  }
  return;
}


// TABULA
  async TabulaScrapper() {
    const url = 'https://tabula.ge/ge/news';
    const response = await this.GetRequestAxios(url);
    const $ = cheerio.load(response);
    const latestNewsItem = $('.news-item-list-item:first');
    const link = latestNewsItem.find('a').attr('href');
    //  inner page
    const article = await this.GetRequestAxios(`https://tabula.ge${link}`);
    const $$ = cheerio.load(article);
    const header = $$('.ArticleHeaderDefault_title__2lrsJ').text();
    const text = $$('.ArticleContent_contentTextWrapper__n-T_q').text();
    const image = $$(".container .NewsID_articleLayout__1Bq0l .NewsID_articleMain__2vSM7 .ArticleBodyDefault_articleThumb__2hHd9 img" ).attr("src")
  
    const Body = {
      web_site: 'tabula.ge',
      title: header.trim(),
      text: text.split("\n").join(""),
      image,
      date: new Date().toString(),
    };
     const isArtcleExist = await this.FindArtcle(header.trim(),);
     if (!isArtcleExist) {
      await this.WriteNews(Body);
    }
    return;
  }


//  ON.GE

async OnGeScrapper(){
  console.log("on ge")
    const url = 'https://on.ge/news'
   const response = await this.GetRequestAxios(url)
   const $  = cheerio.load(response)
   const  articleLink = $('section a:first').first().attr("href");
  //  inner page
   const article = await this.GetRequestAxios(articleLink ) 
     const $$ = cheerio.load(article)
    
    // const articleDiv = $$('.x-border-right').html()
 
 const header = $$(".x-border-right header h1").text()
 
  const image = $$(".x-border-right .article-main-media  .global-figure-image-wrap img").attr("src").substring(2)
  const text = $$(".x-border-right article .article-body ").text()
   const Body = { 
  web_site:"on.ge",
  title:header.trim(),
  text:text.split("\n").join(""),
  image,
  date:new Date().toString()
}
 console.log(Body)
const isArtcleExist = await this.FindArtcle(header.trim(),);
if (!isArtcleExist) {
 await this.WriteNews(Body);
}
 
  return;

}


//  get request axios 
  async GetRequestAxios(url: string) {
    try {
      const res = await axios.get(url);

      return res.data;
    } catch (error) {
      console.error(`Error scraping  ${url}`, error);
    }
  }




  async FindArtcle(title: string) {
    const newsItem = await this.prismaService.news.findFirst({
      where: {
        title: title,
      },
    });

    return newsItem ? true : false;
  }

  async HtmlConvertor(responseBody: any) {
    return cheerio.load(responseBody);
  }
}
