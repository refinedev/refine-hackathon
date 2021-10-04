import { Expose, Exclude } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CompanyDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty({ nullable: true })
  web?: string;

  @Expose()
  @ApiProperty({ nullable: true })
  linkedin?: string;

  @Expose()
  @ApiProperty({ nullable: true })
  twitter?: string;

  @Expose()
  @ApiProperty({ nullable: true })
  instagram?: string;

  @Expose()
  @ApiProperty({ nullable: true })
  youtube?: string;

  @Expose()
  @ApiProperty({ nullable: true })
  github?: string;

  @Expose()
  @ApiProperty()
  isActive: boolean;
}
