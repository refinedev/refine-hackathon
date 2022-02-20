import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { CompanyEntity } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CompanyService extends TypeOrmCrudService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyRepository)
    public readonly repo: Repository<CompanyEntity>,
  ) {
    super(repo);
  }
}
