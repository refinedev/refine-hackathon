import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class JobCreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly id: number;
}

export class JobCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly location: string;

  @ApiProperty()
  @IsOptional()
  readonly content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => JobCreateCompanyDto)
  @ValidateNested()
  readonly company: JobCreateCompanyDto;
}
