import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { SubjectCategory } from '../../../models/subjectCategory.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class SubjectCategoryRepository {
    constructor(
        @Inject('SUBJECT_CATEGORY_REPOSITORY')
        private subjectCategorysRepository: Repository<SubjectCategory>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save subjectCategory
        const subjectCategory = await this.subjectCategorysRepository.create(request)
        await this.subjectCategorysRepository.save(subjectCategory)

        //return
        return subjectCategory
    }

    async getAll(id): Promise<SubjectCategory[] | any> {

        return await this.subjectCategorysRepository.createQueryBuilder('s')
            .leftJoinAndSelect('s.subject', 'ss')
            .leftJoinAndSelect('ss.subjectParent', 'ssp')
            .leftJoinAndSelect('ssp.parent', 'ssps')
            .loadRelationCountAndMap("ss.opinionsCount", "ss.opinions")
            .where(id ? `s.career_id = ${id}` : '')
            // .where(data.userData.userRole[0].role_id == 2 ? `ssu.user_id = ${data.userData.id}`:'')
            .getMany()
        //.leftJoinAndSelect('s.userSubject', 'su'); solo del estudiante que pregunta
        // filtrar las categorias por el id de la carrera del etudiante
    }


    async getById(id): Promise<SubjectCategory | string> {
        const subjectCategory = await this.subjectCategorysRepository.findOne(id)
        if (!subjectCategory) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return subjectCategory;
    }


    async update(id: number, request): Promise<any> {
        let subjectCategory = await this.subjectCategorysRepository.findOne(id);
        if (!subjectCategory)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        subjectCategory = await this.sharedService.updateObject(subjectCategory, request)

        await this.subjectCategorysRepository.save(subjectCategory);

        return subjectCategory;
    }

    async delete(id): Promise<any> {
        const subjectCategory = await this.subjectCategorysRepository.findOne(id);
        if (!subjectCategory)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.subjectCategorysRepository.delete(subjectCategory.id);

        return subjectCategory;

    }

}