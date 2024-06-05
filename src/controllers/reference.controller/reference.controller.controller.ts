import { Controller, Get } from '@nestjs/common';
import { WebSiteReferenceService } from '../../services/reference/web-site-reference.service';

@Controller('reference')
export class ReferenceControllerController {
 
    constructor(private referenceService:WebSiteReferenceService){}
 @Get('web-sites')
  async  GetWebSiteReference(){
    return this.referenceService.GetWebSiteReference();
  }
}
