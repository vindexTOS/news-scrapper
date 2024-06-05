import { IsNotEmpty, Length } from 'class-validator';

export class  CreateNews {
  
 
  // @IsNotEmpty({ message: 'Description is needed' })
  // description: string;
  @IsNotEmpty({ message: 'we need website url' })
  web_site: string;
  @IsNotEmpty({ message: 'we need headline' })
  title : string;

  @IsNotEmpty({ message:  'we need article' })
  text: string
  @IsNotEmpty({ message:  'we need original date' })
  date : string

  image? : string 
}