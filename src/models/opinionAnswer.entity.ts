
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Moment } from 'moment';
import { Opinion } from './opinion.entity';
import { User } from './user.entity';

@Entity({ name: 'opinion_answers' })
export class OpinionAnswer {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    opinion_id: number

    @Column()
    student_id: number

    @CreateDateColumn({ type: "timestamp" })
    created_at: Moment

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Moment

    
    // Relations

    @ManyToOne(() => Opinion, opinion => opinion.id, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
    @JoinColumn({
        name: 'opinion_id',
        referencedColumnName: 'id'
    })
    opinion: Opinion;

    @ManyToOne(() => User, student => student.id, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student: User;

}