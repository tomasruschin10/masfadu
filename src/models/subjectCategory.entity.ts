import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Career } from './career.entity';
import { Subject } from './subject.entity';

@Entity({name:'subject_categories'})
export class SubjectCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  career_id: number;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment

  //relations

  @ManyToOne(() => Career, career => career.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'career_id',
      referencedColumnName: 'id'
  })
  career: Career;

  @OneToMany(() => Subject, subject => subject.subjectCategory ,{cascade: true})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'subject_category_id'
  })
  subject: Subject[];
}