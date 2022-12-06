
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Career } from './career.entity';
import { Offer } from './offer.entity';

@Entity({name:'offer_categories'})
export class OfferCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column()
  // career_id: number;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment

  //relations

  // @ManyToOne(() => Career, career => career.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  // @JoinColumn({
  //     name: 'career_id',
  //     referencedColumnName: 'id'
  // })
  // career: Career;

  @OneToMany(() => Offer, offers => offers.offerCategory ,{cascade: true})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'offer_category_id'
  })
  offers: Offer[];
}