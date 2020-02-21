import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Office } from './office.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column('int')
  age: number;

  @Column({ length: 20 })
  phone: string;

  @ManyToOne(type => Office, office => office.employees, {nullable: false})
  office: Office;
}
