import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { SubjectParent } from '../../../models/subjectParent.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class SubjectParentRepository {
    constructor(
        @Inject('SUBJECT_PARENT_REPOSITORY')
        private subjectParentsRepository: Repository<SubjectParent>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save subjectParent
        const subjectParent = await this.subjectParentsRepository.create(request)
        await this.subjectParentsRepository.save(subjectParent)
        
        //return
        return subjectParent
    }

    async getAll(): Promise<SubjectParent[] | string> {
        return await this.subjectParentsRepository.createQueryBuilder('s')
            .getMany()
    }


    async getById(id): Promise<SubjectParent | any> {
        const subjectParent = await this.subjectParentsRepository.createQueryBuilder('s')
            .where(`s.id = ${id}`)
            .getOne()
        if (!subjectParent) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return subjectParent;
    }


    async update(id: number, request): Promise<any> {
        let subjectParent = await this.subjectParentsRepository.findOne(id);
        if (!subjectParent)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        subjectParent = await this.sharedService.updateObject(subjectParent, request)

        await this.subjectParentsRepository.save(subjectParent);

        return subjectParent;
    }

    async delete(id): Promise<any> {
        const subjectParent = await this.subjectParentsRepository.findOne(id);
        if (!subjectParent)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.subjectParentsRepository.delete(subjectParent.id);

        return subjectParent;

    }

    async deleteMany(data, id): Promise<any> {
        try {
            await this.subjectParentsRepository.createQueryBuilder()
                .delete()
                .where(`subject_id = ${id} AND subject_parent_id IN(${data})`)
                .execute()
        } catch (error) {
            
        }

        return 'success';

    }

}