import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty()
  @IsOptional()
  readonly web?: string;

  @ApiProperty()
  @IsOptional()
  readonly linkedin?: string;

  @ApiProperty()
  @IsOptional()
  readonly twitter?: string;

  @ApiProperty()
  @IsOptional()
  readonly instagram?: string;

  @ApiProperty()
  @IsOptional()
  readonly youtube?: string;

  @ApiProperty()
  @IsOptional()
  readonly github?: string;

  @ApiProperty()
  @IsOptional()
  readonly isActive: boolean;
}
