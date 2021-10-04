import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CompanyEntity } from './company.entity';

@Entity({ name: 'job' })
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  location?: string;

  @Column({
    type: 'longtext',
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
