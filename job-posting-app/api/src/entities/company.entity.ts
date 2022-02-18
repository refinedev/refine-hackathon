import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { JobEntity } from './job.entity';

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  web?: string;

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  twitter?: string;

  @Column({ nullable: true })
  instagram?: string;

  @Column({ nullable: true })
  youtube?: string;

  @Column({ nullable: true })
  github?: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => JobEntity, (job) => job.company, {
    eager: true,
    cascade: true,
  })
  jobs?: JobEntity[];
}
