import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { LostObject } from '../../../models/lostObject.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class LostObjectRepository {
    constructor(
        @Inject('LOST_OBJECT_REPOSITORY')
        private lostObjectsRepository: Repository<LostObject>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save lostObject
        const lostObject = await this.lostObjectsRepository.create(request)
        await this.lostObjectsRepository.save(lostObject)

        //return
        return lostObject
    }

    async getAll(search): Promise<LostObject[] | string> {
        return await this.lostObjectsRepository.createQueryBuilder('l')
            .leftJoinAndSelect('l.image', 'li')
            .leftJoinAndSelect('l.user', 'lu')
            .where(search ? `l.description LIKE '%${search}%' OR l.title LIKE '%${search}%'` : '')
            .orderBy('l.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<LostObject | string> {
        const lostObject = await this.lostObjectsRepository.createQueryBuilder('l')
            .leftJoinAndSelect('l.image', 'li')
            .leftJoinAndSelect('l.user', 'lu')
            .where(`l.id = ${id}`)
            .getOne()
        if (!lostObject) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return lostObject;
    }



    async update(id: number, request): Promise<any> {
        let lostObject = await this.lostObjectsRepository.findOne(id);
        if (!lostObject)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        lostObject = await this.sharedService.updateObject(lostObject, request)

        await this.lostObjectsRepository.save(lostObject);

        return lostObject;
    }

    async delete(id): Promise<any> {
        const lostObject = await this.lostObjectsRepository.findOne(id);
        if (!lostObject)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.lostObjectsRepository.delete(lostObject.id);

        return lostObject;

    }

}