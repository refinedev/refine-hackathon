import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CompanyEntity } from './company.entity';

@Entity({ name: 'job' })
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  location?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => CompanyEntity, (company) => company.jobs, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;
}
