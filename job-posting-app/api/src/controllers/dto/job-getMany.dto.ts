import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { JobDto } from './job.dto';

@Exclude()
export class JobGetManyDto {
  @Expose()
  @Type(() => JobDto)
  @ApiProperty({
    type: JobDto,
  })
  data: JobDto[];

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
