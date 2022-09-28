import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Subject } from '../../../models/subject.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class SubjectRepository {
    constructor(
        @Inject('SUBJECT_REPOSITORY')
        private subjectsRepository: Repository<Subject>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save subject
        const subject = await this.subjectsRepository.create(request)
        await this.subjectsRepository.save(subject)
        
        //return
        return subject
    }

    async getAll(career): Promise<Subject[] | string> {
        return await this.subjectsRepository.createQueryBuilder('s')
            .innerJoinAndSelect('s.subjectCategory', 'ss')
            .where(career ? `ss.career_id = ${career}`:'')
            .loadRelationCountAndMap("s.opinionsCount", "s.opinions")
            .orderBy('s.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Subject | any> {
        const subject = await this.subjectsRepository.createQueryBuilder('s')
            .innerJoinAndSelect('s.subjectCategory', 'ss')
            .leftJoinAndSelect('s.userSubject', 'su')
            .where(`s.id = ${id}`)
            .getOne()
        if (!subject) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return subject;
    }


    async update(id: number, request): Promise<any> {
        let subject = await this.subjectsRepository.findOne(id);
        if (!subject)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        subject = await this.sharedService.updateObject(subject, request)

        await this.subjectsRepository.save(subject);

        return subject;
    }

    async delete(id): Promise<any> {
        const subject = await this.subjectsRepository.findOne(id);
        if (!subject)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.subjectsRepository.delete(subject.id);

        return subject;

    }

    async deleteMany(data): Promise<any> {
        try {
            await this.subjectsRepository.createQueryBuilder().delete().where(`id IN(${data})`).execute()
        } catch (error) {
            
        }

        return 'success';

    }

}