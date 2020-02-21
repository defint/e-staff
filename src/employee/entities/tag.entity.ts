import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  label: string;

  @ManyToMany(type => Employee, employee => employee.tags)
  employees: Employee[];
}
