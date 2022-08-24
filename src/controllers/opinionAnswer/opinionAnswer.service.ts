import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { OpinionAnswerRepository } from '../../modules/database/repositories/opinionAnswerRepository.service';
@Injectable()
export class OpinionAnswerService {

    constructor(
        private readonly opinionAnswerRepository: OpinionAnswerRepository
    ) {}

    async create(request: any, user_id:any){
      request.student_id = user_id
      const opinionAnswer = await this.opinionAnswerRepository.create(request)
      if (!opinionAnswer) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

      return opinionAnswer;
   }

   async getAll(data){
      const opinionAnswers = await this.opinionAnswerRepository.getAll(data)
      return opinionAnswers;
   }

   async getById(id:number){
      const opinionAnswer = await this.opinionAnswerRepository.getById(id)
      return opinionAnswer;
   }

   async update(id:number, request: any){

      const opinionAnswer = await this.opinionAnswerRepository.update(id, request)

      return opinionAnswer;
   }

   async delete(id: number){
      const opinionAnswer = await this.opinionAnswerRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}