
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Opinion } from './opinion.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'opinion_tags' })
export class OpinionTag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  opinion_id: number

  @Column({ nullable: true })
  tag_id: number

  @CreateDateColumn({ type: "timestamp" })
  created_at: Moment

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Moment

  //relations

  @ManyToOne(() => Opinion, opinion => opinion.id, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
  @JoinColumn({
    name: 'opinion_id',
    referencedColumnName: 'id'
  })
  opinion: Opinion;

  @ManyToOne(() => Tag, tag => tag.id, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
  @JoinColumn({
    name: 'tag_id',
    referencedColumnName: 'id'
  })
  tag: Tag;

}