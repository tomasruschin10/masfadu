import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Resource } from '../../../models/resource.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class ResourceRepository {
    constructor(
        @Inject('RESOURCE_REPOSITORY')
        private resourcesRepository: Repository<Resource>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save resource
        const resource = await this.resourcesRepository.create(request)
        await this.resourcesRepository.save(resource)
        
        //return
        return resource
    }

    async getAll(): Promise<Resource[] | string> {
        return await this.resourcesRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.user', 'ru')
            .innerJoinAndSelect('r.image', 'ri')
            .innerJoinAndSelect('r.resourceCategory', 'rr')
            .orderBy('r.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Resource | string> {
        const resource = await this.resourcesRepository.createQueryBuilder('r')
            .innerJoinAndSelect('r.user', 'ru')
            .innerJoinAndSelect('r.image', 'ri')
            .innerJoinAndSelect('r.resourceCategory', 'rr')
            .where(`r.id = ${id}`)
            .getOne()
        if (!resource) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return resource;
    }


    async update(id: number, request): Promise<any> {
        let resource = await this.resourcesRepository.findOne(id);
        if (!resource)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        resource = await this.sharedService.updateObject(resource, request)

        await this.resourcesRepository.save(resource);

        return resource;
    }

    async delete(id): Promise<any> {
        const resource = await this.resourcesRepository.findOne(id);
        if (!resource)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.resourcesRepository.delete(resource.id);

        return resource;

    }

}