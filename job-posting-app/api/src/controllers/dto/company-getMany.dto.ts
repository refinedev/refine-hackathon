import { Expose, Exclude, Type } from 'class-transformer';

import { CompanyDto } from './company.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CompanyGetManyDto {
  @Expose()
  @Type(() => CompanyDto)
  @ApiProperty({
    type: CompanyDto,
  })
  data: CompanyDto[];

  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @ApiProperty()
  total: number;

  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  pageCount: number;
}
