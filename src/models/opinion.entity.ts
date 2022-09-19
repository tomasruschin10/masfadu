
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Moment } from 'moment';
import { OpinionTag } from './opinionTag.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Subject } from './subject.entity';
import { OpinionAnswer } from './opinionAnswer.entity';

@Entity({ name: 'opinions' })
export class Opinion {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({default: 1, type: 'boolean', nullable: true})
    anonymous: number;

    @Column()
    title: string

    @Column({type: 'longtext'})
    description: string

    @Column()
    student_id: number

    @Column()
    subject_id: number

    @Column({ nullable: true })
    professor: string

    @CreateDateColumn({ type: "timestamp" })
    created_at: Moment

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Moment

    
    // Relations

    @OneToMany(() => OpinionTag, opinionTags => opinionTags.opinion, { cascade: true })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'opinion_id'
    })
    opinionTags: OpinionTag[];

    @ManyToOne(() => User, student => student.id, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student: User;

    @ManyToOne(() => Subject, subject => subject.id, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
    @JoinColumn({
        name: 'subject_id',
        referencedColumnName: 'id'
    })
    subject: Subject;

    @OneToMany(() => OpinionAnswer, answers => answers.opinion, { cascade: true })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'opinion_id'
    })
    answers: OpinionAnswer[];
}