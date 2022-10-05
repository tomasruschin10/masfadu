
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { User } from './user.entity';

@Entity({name:'activities'})
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({nullable: true})
  action: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  type: string;

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