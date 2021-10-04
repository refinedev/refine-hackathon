import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { CompanyDto } from './company.dto';

@Exclude()
export class JobDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty({ nullable: true })
  location: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  isActive: boolean;

  @Expose()
  @Type(() => CompanyDto)
  @ApiProperty({
    type: CompanyDto,
  })
  company: CompanyDto[];
}
