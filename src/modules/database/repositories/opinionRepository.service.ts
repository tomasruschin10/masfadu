import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Opinion } from '../../../models/opinion.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class OpinionRepository {
    constructor(
        @Inject('OPINION_REPOSITORY')
        private opinionsRepository: Repository<Opinion>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save opinion
        const opinion = await this.opinionsRepository.create(request)
        await this.opinionsRepository.save(opinion)

        //return
        return opinion
    }

    async getAll(): Promise<Opinion[] | string> {
        return await this.opinionsRepository.createQueryBuilder('c')
            .innerJoinAndSelect('c.image', 'ci')
            .getMany()
    }


    async getById(id): Promise<Opinion | string> {
        const opinion = await this.opinionsRepository.createQueryBuilder('c')
            .innerJoinAndSelect('c.image', 'ci')
            .where(`c.id = ${id}`)
            .getOne()
        if (!opinion) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return opinion;
    }


    async update(id: number, request): Promise<any> {
        let opinion = await this.opinionsRepository.findOne(id);
        if (!opinion)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        opinion = await this.sharedService.updateObject(opinion, request)

        await this.opinionsRepository.save(opinion);

        return opinion;
    }

    async delete(id): Promise<any> {
        const opinion = await this.opinionsRepository.findOne(id);
        if (!opinion)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.opinionsRepository.delete(opinion.id);

        return opinion;

    }

}