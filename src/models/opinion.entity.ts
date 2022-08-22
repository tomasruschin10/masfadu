
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Moment } from 'moment';
import { OpinionTag } from './opinionTag.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'opinions' })
export class Opinion {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tittle: string

    @Column()
    description: string

    @Column({ nullable: true })
    professor: string

    @CreateDateColumn({ type: "timestamp" })
    created_at: Moment

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Moment

    
    // Relations

    @OneToMany(() => OpinionTag, opinionTag => opinionTag.id, { cascade: true })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'opinion_id'
    })
    opinionTag: OpinionTag[];

}