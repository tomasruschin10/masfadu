import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { OpinionAnswer } from '../../../models/opinionAnswer.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class OpinionAnswerRepository {
    constructor(
        @Inject('OPINION_ANSWER_REPOSITORY')
        private opinionAnswersRepository: Repository<OpinionAnswer>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save opinionAnswer
        const opinionAnswer = await this.opinionAnswersRepository.create(request)
        await this.opinionAnswersRepository.save(opinionAnswer)

        //return
        return opinionAnswer
    }

    async getAll(data): Promise<OpinionAnswer[] | string> {
        let query = `a.opinion_id = ${data.opinion_id} && a.student_id = ${data.student_id}`

        if (!data.student_id || !data.opinion_id) {
            if (!data.opinion_id) query = query.replace(`a.opinion_id = ${data.opinion_id}`, "")
            if (!data.student_id) query = query.replace(`a.student_id = ${data.student_id}`, "")
            query = query.replace('&&', "")
        }

        return await this.opinionAnswersRepository.createQueryBuilder('a')
            .where(query)
            .getMany()
    }


    async getById(id): Promise<OpinionAnswer | string> {
        const opinionAnswer = await this.opinionAnswersRepository.createQueryBuilder('c')
            .where(`c.id = ${id}`)
            .getOne()
        if (!opinionAnswer) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return opinionAnswer;
    }

    async findOpinionAnswer(id): Promise<OpinionAnswer | string> {
        return await this.opinionAnswersRepository.findOne(id)
    }


    async update(id: number, request): Promise<any> {
        let opinionAnswer = await this.opinionAnswersRepository.findOne(id);
        if (!opinionAnswer)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        opinionAnswer = await this.sharedService.updateObject(opinionAnswer, request)

        await this.opinionAnswersRepository.save(opinionAnswer);

        return opinionAnswer;
    }

    async delete(id): Promise<any> {
        const opinionAnswer = await this.opinionAnswersRepository.findOne(id);
        if (!opinionAnswer)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.opinionAnswersRepository.delete(opinionAnswer.id);

        return opinionAnswer;

    }

}