import { HttpException, HttpStatus, Injectable,   NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExeptionMiddleware implements NestMiddleware {
 
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
        throw new HttpException(
            'INTERNAL_SERVER_ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
