
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Career } from './career.entity';

@Entity({name:'subject_categories'})
export class SubjectCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  career_id;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment

  //relations

  @ManyToOne(() => Career, career => career.id, {onDelete: 'CASCADE'})
  @JoinColumn({
      name: 'career_id',
      referencedColumnName: 'id'
  })
  career: Career;
}