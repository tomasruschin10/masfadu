
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Offer } from './offer.entity';
import { Advertisement } from './advertisement.entity';

@Entity({ name: 'tags' })
export class Tag {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @CreateDateColumn({ type: "timestamp" })
    created_at: Moment

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Moment

}