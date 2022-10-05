
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { User } from './user.entity';

@Entity({name:'notifications'})
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  description: string;

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
}