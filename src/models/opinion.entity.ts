
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Moment } from 'moment';
import { OpinionTag } from './opinionTag.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'opinions' })
export class Opinion {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
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

    @ManyToOne(() => User, student => student.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student: User;

    @ManyToOne(() => Subject, subject => subject.id, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'subject_id',
        referencedColumnName: 'id'
    })
    subject: Subject;

}