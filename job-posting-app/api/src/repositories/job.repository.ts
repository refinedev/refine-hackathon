import { EntityRepository, Repository } from 'typeorm';

import { JobEntity } from '../entities/job.entity';

@EntityRepository(JobEntity)
export class JobRepository extends Repository<JobEntity> {}
