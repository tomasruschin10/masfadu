
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Offer } from './offer.entity';
import { Advertisement } from './advertisement.entity';
import { BalancePartner } from './balancePartner.entity';

@Entity({ name: 'balances' })
export class Balance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    amount: number

    @Column({ nullable: true })
    offer_id: number

    @Column({ nullable: true })
    advertisement_id: number

    @CreateDateColumn({ type: "timestamp" })
    created_at: Moment

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Moment


    //relations

    @ManyToOne(() => Offer, offer => offer.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'offer_id',
        referencedColumnName: 'id'
    })
    offer: Offer;

    @ManyToOne(() => Advertisement, advertisement => advertisement.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'advertisement_id',
        referencedColumnName: 'id'
    })
    advertisement: Advertisement;

    @OneToMany(() => BalancePartner, balancePartner => balancePartner.id, { cascade: true })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'balance_id'
    })
    balancePartner: BalancePartner[];
}