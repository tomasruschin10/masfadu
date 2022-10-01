import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Feedback } from '../../../models/feedback.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class FeedbackRepository {
    constructor(
        @Inject('FEEDBACK_REPOSITORY')
        private feedbacksRepository: Repository<Feedback>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save feedback
        const feedback = await this.feedbacksRepository.create(request)
        await this.feedbacksRepository.save(feedback)
        
        //return
        return feedback
    }

    async getAll(): Promise<Feedback[] | string> {
        return await this.feedbacksRepository.createQueryBuilder('f')
            .innerJoinAndSelect('f.user', 'fu')
            .orderBy('f.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Feedback | string> {
        const feedback = await this.feedbacksRepository.createQueryBuilder('f')
            .innerJoinAndSelect('f.user', 'fu')
            .where(`f.id = ${id}`)
            .getOne()
        if (!feedback) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return feedback;
    }


    async update(id: number, request): Promise<any> {
        let feedback = await this.feedbacksRepository.findOne(id);
        if (!feedback)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        feedback = await this.sharedService.updateObject(feedback, request)

        await this.feedbacksRepository.save(feedback);

        return feedback;
    }

    async delete(id): Promise<any> {
        const feedback = await this.feedbacksRepository.findOne(id);
        if (!feedback)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.feedbacksRepository.delete(feedback.id);

        return feedback;

    }

}