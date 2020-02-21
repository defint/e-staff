import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  title: string;
}
