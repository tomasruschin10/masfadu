
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
import { Moment } from 'moment';

@Entity({name:'user_roles'})
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  role_id: number;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment


  //relations

  @ManyToOne(() => User, user => user.userRole , {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id'
  })
  user: User;

  @ManyToOne(() => Role, role => role.id , { onDelete: 'CASCADE'})
  @JoinColumn({
      name: 'role_id',
      referencedColumnName: 'id'
  })
  role: Role;

}