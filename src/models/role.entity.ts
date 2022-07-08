
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Moment } from 'moment';
import { UserRole } from './userRole.entity';

@Entity({name:'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({type: "timestamp"})
    created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
    updated_at: Moment



  //relations

  @OneToMany(() => UserRole, userRole => userRole.role ,{cascade: true})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'role_id'
  })
  userRole: UserRole[];
}