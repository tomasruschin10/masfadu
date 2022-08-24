import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { FeedbackRepository } from '../../modules/database/repositories/feedbackRepository.service';
@Injectable()
export class FeedbackService {

    constructor(
        private readonly feedbackRepository: FeedbackRepository
    ) {}

    async create(request: any){

      const feedback = await this.feedbackRepository.create(request)
      if (!feedback) throw new BadRequestException(['incorrect data'])     

      return feedback;
   }

   async getAll(){
      const feedbacks = await this.feedbackRepository.getAll()
      return feedbacks;
   }

   async getById(id:number){
      const feedback = await this.feedbackRepository.getById(id)
      return feedback;
   }

   async update(id:number, request: any){

      const feedback = await this.feedbackRepository.update(id, request)

      return feedback;
   }

   async delete(id: number){
      const feedback = await this.feedbackRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}