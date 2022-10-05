import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ExtraScoreRepository } from '../../modules/database/repositories/extraScoreRepository.service';
@Injectable()
export class ExtraScoreService {

    constructor(
        private readonly extraScoreRepository: ExtraScoreRepository
    ) {}

    async create(request: any){

      const extraScore = await this.extraScoreRepository.create(request)
      if (!extraScore) throw new BadRequestException(['incorrect data'])     

      return extraScore;
   }

   async getAll(){
      const extraScores = await this.extraScoreRepository.getAll()
      return extraScores;
   }

   async getById(id:number){
      const extraScore = await this.extraScoreRepository.getById(id)
      return extraScore;
   }

   async update(id:number, request: any){

      const extraScore = await this.extraScoreRepository.update(id, request)

      return extraScore;
   }

   async delete(id: number){
      const extraScore = await this.extraScoreRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}