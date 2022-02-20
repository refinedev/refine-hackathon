import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { JobEntity } from '../entities/job.entity';
import { JobRepository } from '../repositories/job.repository';

@Injectable()
export class JobService extends TypeOrmCrudService<JobEntity> {
  constructor(
    @InjectRepository(JobRepository)
    public readonly repo: Repository<JobEntity>,
  ) {
    super(repo);
  }
}
