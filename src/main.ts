import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewsService } from './services/SCRAPPER/news.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const webScraperService = app.get(NewsService);
  webScraperService.startScraping();
  await app.listen(3000, '192.168.1.130');
}
bootstrap();
