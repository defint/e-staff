import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  label: string;

  @ManyToMany(type => Employee, employee => employee.tags)
  employees: Employee[];
}
