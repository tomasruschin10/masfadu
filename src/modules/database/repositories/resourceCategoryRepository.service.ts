import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { ResourceCategory } from '../../../models/resourceCategory.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class ResourceCategoryRepository {
    constructor(
        @Inject('RESOURCE_CATEGORY_REPOSITORY')
        private resourceCategorysRepository: Repository<ResourceCategory>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save resourceCategory
        const resourceCategory = await this.resourceCategorysRepository.create(request)
        await this.resourceCategorysRepository.save(resourceCategory)

        //return
        return resourceCategory
    }

    async getAll(data): Promise<ResourceCategory[] | string> {
        let query = ''
        data.subject ? query += `rr.subject_id = ${data.subject}` : ''
        if (data.search) {
            query != "" ? query += ' AND ' : ''
            query += `rr.name LIKE '%${data.search}%'`
        }
        return await this.resourceCategorysRepository.createQueryBuilder('r')
            .leftJoinAndSelect('r.resources', 'rr')
            .leftJoinAndSelect('rr.user', 'rru')
            .leftJoinAndSelect('rr.image', 'rri')
            .where(query)
            .orderBy('r.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<ResourceCategory | any> {
        const resourceCategory = await this.resourceCategorysRepository.findOne(id)
        if (!resourceCategory) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return resourceCategory;
    }


    async update(id: number, request): Promise<any> {
        let resourceCategory = await this.resourceCategorysRepository.findOne(id);
        if (!resourceCategory)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        resourceCategory = await this.sharedService.updateObject(resourceCategory, request)

        await this.resourceCategorysRepository.save(resourceCategory);

        return resourceCategory;
    }

    async delete(id): Promise<any> {
        const resourceCategory = await this.resourceCategorysRepository.findOne(id);
        if (!resourceCategory)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.resourceCategorysRepository.delete(resourceCategory.id);

        return resourceCategory;

    }

}