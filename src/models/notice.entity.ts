
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Image } from './image.entity';

@Entity({name:'notices'})
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image_id: number;

  @Column({type: 'datetime'})
  date_start: Date;

  @Column({type: 'datetime'})
  date_end: Date;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment

  
  @ManyToOne(() => Image, image => image.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'image_id',
      referencedColumnName: 'id'
  })
  image: Image;
}