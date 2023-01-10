
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Image } from './image.entity';
import { Career } from './career.entity';
import { Partner } from './partner.entity';

@Entity({name:'advertisements'})
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  career_id: number;

  @Column()
  partner_id: number;

  @Column()
  image_id: number;

  @Column()
  url: string;

  @Column({nullable: true})
  key: string;

  @Column({type: 'datetime'})
  date_start: Date;

  @Column({type: 'datetime'})
  date_end: Date;

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

  @ManyToOne(() => Partner, partner => partner.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({
      name: 'partner_id',
      referencedColumnName: 'id'
  })
  partner: Partner;
}