
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { SubjectCategory } from './subjectCategory.entity';
import { Career } from './career.entity';
import { UserSubject } from './userSubject.entity';

@Entity({name:'subjects'})
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  subject_category_id: number;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment

  //relations
  @ManyToOne(() => SubjectCategory, subjectCategory => subjectCategory.id, {onDelete: 'CASCADE'})
  @JoinColumn({
      name: 'subject_category_id',
      referencedColumnName: 'id'
  })
  subjectCategory: SubjectCategory;

  @OneToMany(() => UserSubject, userSubject => userSubject.subject ,{cascade: true})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'subject_id'
  })
  userSubject: UserSubject[];
}