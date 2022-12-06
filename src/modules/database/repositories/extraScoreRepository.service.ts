import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { ExtraScore } from '../../../models/extraScore.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class ExtraScoreRepository {
    constructor(
        @Inject('EXTRA_SCORE_REPOSITORY')
        private extraScoresRepository: Repository<ExtraScore>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save extraScore
        const extraScore = await this.extraScoresRepository.create(request)
        await this.extraScoresRepository.save(extraScore)
        
        //return
        return extraScore
    }

    async getAll(): Promise<ExtraScore[] | string> {
        return await this.extraScoresRepository.createQueryBuilder('e')
            .orderBy('e.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<ExtraScore | any> {
        const extraScore = await this.extraScoresRepository.createQueryBuilder('e')
            .where(`e.id = ${id}`)
            .getOne()
        if (!extraScore) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return extraScore;
    }


    async update(id: number, request): Promise<any> {
        let extraScore = await this.extraScoresRepository.findOne(id);
        if (!extraScore)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        extraScore = await this.sharedService.updateObject(extraScore, request)

        await this.extraScoresRepository.save(extraScore);

        return extraScore;
    }

    async delete(id): Promise<any> {
        const extraScore = await this.extraScoresRepository.findOne(id);
        if (!extraScore)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.extraScoresRepository.delete(extraScore.id);

        return extraScore;

    }
}