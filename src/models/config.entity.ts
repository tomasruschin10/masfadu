
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Moment } from 'moment';

@Entity({name:'config'})
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({nullable: true})
  name: string;

  @Column()
  value: string;
}