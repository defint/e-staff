import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, unique: true, nullable: false })
  title: string;

  @OneToMany(type => Employee, employee => employee.office)
  employees: Employee[];
}
