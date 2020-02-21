import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @Column({ length: 200 })
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Column('int')
  age: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @IsMobilePhone('any')
  @Column({ length: 20 })
  phone: string;
}
