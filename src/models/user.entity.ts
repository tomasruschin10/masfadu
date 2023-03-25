
import { Moment } from 'moment';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Career } from './career.entity';
import { Image } from './image.entity';
import { UserRole } from './userRole.entity';

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({nullable: true})
  username: string;

  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Column({nullable: true})
  name: string;
  
  @Column({nullable: true})
  lastname: string;

  @Column({nullable: true})
  phone: string;

  @Column({nullable: true})
  instagram: string;

  @Column({nullable: true})
  web: string;

  @Column({nullable: true})
  uid: string;

  @Column({default: 1, type: 'boolean'})
  active: number;

  @Column({nullable: true})
  career_id: number;

  @Column({nullable: true})
  image_id: number;

  @Column({nullable: true})
  remember_token: string;

  @Column({nullable: true})
  device_token: string;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment


  //relations

  @ManyToOne(() => Image, image => image.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'image_id',
      referencedColumnName: 'id'
  })
  image: Image;

  @ManyToOne(() => Career, career => career.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'career_id',
      referencedColumnName: 'id'
  })
  career: Career;

  @OneToMany(() => UserRole, userRole => userRole.user ,{cascade: true})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'user_id'
  })
  userRole: UserRole[];
}
