
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { User } from './user.entity';
import { Subject } from './subject.entity';
import { ExtraScore } from './extraScore.entity';

@Entity({name:'user_subjects'})
export class UserSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  subject_id: number;

  @Column({nullable: true})
  score: number;

  @Column({default: 0, type: 'boolean'})
  finish: number;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment

  //relations
  @ManyToOne(() => User, user => user.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id'
  })
  user: User;

  @ManyToOne(() => Subject, subject => subject.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'subject_id',
      referencedColumnName: 'id'
  })
  subject: Subject;

  @OneToMany(() => ExtraScore, extra_score => extra_score.user_subject, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'extra_score_id'
  })
  extra_score: ExtraScore[];
}