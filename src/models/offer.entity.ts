
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Image } from './image.entity';
import { OfferCategory } from './offerCategory.entity';
import { Partner } from './partner.entity';
import { Career } from './career.entity';

@Entity({ name: 'offers' })
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: 0 })
    point: number;

    @Column({ nullable: true })
    title: string;

    @Column()
    offer_category_id: number;

    @Column()
    career_id: number;

    @Column()
    partner_id: number;

    @Column({ nullable: true, type: 'longtext' })
    description: string;

    @Column({ nullable: true })
    url: string;

    @Column()
    image_id: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Moment

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Moment

    //relations
    @ManyToOne(() => OfferCategory, offerCategory => offerCategory.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'offer_category_id',
        referencedColumnName: 'id'
    })
    offerCategory: OfferCategory;

    @ManyToOne(() => Image, image => image.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'image_id',
        referencedColumnName: 'id'
    })
    image: Image;

    @ManyToOne(() => Partner, partner => partner.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'partner_id',
        referencedColumnName: 'id'
    })
    partner: Partner;

    @ManyToOne(() => Career, career => career.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'career_id',
        referencedColumnName: 'id'
    })
    career: Career;
}