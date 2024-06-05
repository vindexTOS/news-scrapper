import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  @IsString()
  website?: string;
  @IsOptional()
  @IsString()
  date:'desc' | 'asc'
  @IsOptional()
   
  page?: string;

  @IsOptional()
  
  pageSize?: string;
}
