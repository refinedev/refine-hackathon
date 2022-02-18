import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'simple-array', default: [] })
  roles?: string[];
}
