
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Image } from './image.entity';
import { User } from './user.entity';
import { Subject } from './subject.entity';
import { ResourceCategory } from './resourceCategory.entity';

@Entity({name:'resources'})
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column()
  image_id: number;

  @Column()
  subject_id: number;

  @Column({ nullable: true})
  url: string;

  @Column({type: 'longtext', nullable: true})
  html: string;

  @Column()
  resource_category_id: number;

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

  @ManyToOne(() => Image, image => image.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'image_id',
      referencedColumnName: 'id'
  })
  image: Image;

  @ManyToOne(() => Subject, subject => subject.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'subject_id',
      referencedColumnName: 'id'
  })
  subject: Subject;

  @ManyToOne(() => ResourceCategory, resourceCategory => resourceCategory.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'resource_category_id',
      referencedColumnName: 'id'
  })
  resourceCategory: ResourceCategory;
}