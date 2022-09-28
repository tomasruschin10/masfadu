import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Career } from '../../../models/career.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class CareerRepository {
    constructor(
        @Inject('CAREER_REPOSITORY')
        private careersRepository: Repository<Career>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save career
        const career = await this.careersRepository.create(request)
        await this.careersRepository.save(career)
        
        //return
        return career
    }

    async getAll(): Promise<Career[] | string> {
        return await this.careersRepository.createQueryBuilder('c')
            .innerJoinAndSelect('c.image', 'ci')
            .orderBy('c.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Career | string> {
        const career = await this.careersRepository.createQueryBuilder('c')
            .innerJoinAndSelect('c.image', 'ci')
            .where(`c.id = ${id}`)
            .getOne()
        if (!career) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return career;
    }


    async update(id: number, request): Promise<any> {
        let career = await this.careersRepository.findOne(id);
        if (!career)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        career = await this.sharedService.updateObject(career, request)

        await this.careersRepository.save(career);

        return career;
    }

    async delete(id): Promise<any> {
        const career = await this.careersRepository.findOne(id);
        if (!career)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.careersRepository.delete(career.id);

        return career;

    }

}