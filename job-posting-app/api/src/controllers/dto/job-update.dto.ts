import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class JobUpdateCompanyDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;
}

export class JobUpdateDto {
  @ApiProperty()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly location: string;

  @ApiProperty()
  @IsOptional()
  readonly content?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => JobUpdateCompanyDto)
  @ValidateNested()
  readonly company: JobUpdateCompanyDto;
}
