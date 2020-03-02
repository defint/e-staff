import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Office } from './office.entity';
import { Tag } from './tag.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false })
  name: string;

  @Column('date', { nullable: true })
  dob: string;

  @Column({ length: 20 })
  phone: string;

  @ManyToOne(type => Office, office => office.employees, { nullable: false })
  office: Office;

  @ManyToMany(type => Tag, tag => tag.employees)
  @JoinTable()
  tags: Tag[];
}
