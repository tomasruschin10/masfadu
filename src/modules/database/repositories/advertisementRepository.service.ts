import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Advertisement } from '../../../models/advertisement.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class AdvertisementRepository {
    constructor(
        @Inject('ADVERTISEMENT_REPOSITORY')
        private advertisementsRepository: Repository<Advertisement>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save advertisement
        const advertisement = await this.advertisementsRepository.create(request)
        await this.advertisementsRepository.save(advertisement)
        
        //return
        return advertisement
    }

    async getAll(active): Promise<Advertisement[] | string> {
        let date = new Date(Date.now()).toISOString()
        return await this.advertisementsRepository.createQueryBuilder('a')
            .innerJoinAndSelect('a.image', 'ai')
            .innerJoinAndSelect('a.partner', 'ap')
            .innerJoinAndSelect('a.career', 'ac')
            .where(active && active == 'active' ? `a.date_start <= '${date}' && a.date_end >= '${date}'`:'')
            .orderBy('a.id', 'DESC')
            .getMany()
    }

    async getByKey(key): Promise<Advertisement[] | string> {
        let date = new Date(Date.now()).toISOString()
        return await this.advertisementsRepository.createQueryBuilder('a')
            .innerJoinAndSelect('a.image', 'ai')
            .innerJoinAndSelect('a.partner', 'ap')
            .innerJoinAndSelect('a.career', 'ac')
            .where(`a.date_start <= '${date}' && a.date_end >= '${date}' && a.key = '${key}'`)
            .orderBy('a.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Advertisement | string> {
        const advertisement = await this.advertisementsRepository.createQueryBuilder('a')
            .innerJoinAndSelect('a.image', 'ai')
            .innerJoinAndSelect('a.partner', 'ap')
            .innerJoinAndSelect('a.career', 'ac')
            .where(`a.id = ${id}`)
            .getOne()
        if (!advertisement) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return advertisement;
    }


    async update(id: number, request): Promise<any> {
        let advertisement = await this.advertisementsRepository.findOne(id);
        if (!advertisement)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        advertisement = await this.sharedService.updateObject(advertisement, request)

        await this.advertisementsRepository.save(advertisement);

        return advertisement;
    }

    async delete(id): Promise<any> {
        const advertisement = await this.advertisementsRepository.findOne(id);
        if (!advertisement)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.advertisementsRepository.delete(advertisement.id);

        return advertisement;

    }

}