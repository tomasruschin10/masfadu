
import { Moment } from 'moment';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Image } from './image.entity';
import { UserRole } from './userRole.entity';

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  image_id: number;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment


  //relations

  @ManyToOne(() => Image, image => image.id)
  @JoinColumn({
      name: 'image_id',
      referencedColumnName: 'id'
  })
  image: Image;

  @OneToMany(() => UserRole, userRole => userRole.user ,{cascade: true})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'user_id'
  })
  userRole: UserRole[];
}
