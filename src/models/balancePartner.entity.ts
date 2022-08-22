
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Moment } from 'moment';
import { Balance } from './balance.entity';
import { Partner } from './partner.entity';

@Entity({ name: 'balance_partners' })
export class BalancePartner {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  balance_id: number

  @Column({ nullable: true })
  partner_id: number

  @CreateDateColumn({ type: "timestamp" })
  created_at: Moment

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Moment

  //relations

  @ManyToOne(() => Balance, balance => balance.id, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'balance_id',
    referencedColumnName: 'id'
  })
  balance: Balance;

  @ManyToOne(() => Partner, partner => partner.id, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'partner_id',
    referencedColumnName: 'id'
  })
  partner: Partner;

}