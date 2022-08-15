import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { SubjectRepository } from '../../modules/database/repositories/subjectRepository.service';
@Injectable()
export class SubjectService {

    constructor(
        private readonly subjectRepository: SubjectRepository
    ) {}

    async create(request: any){

      const subject = await this.subjectRepository.create(request)
      if (!subject) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

      return subject;
   }

   async getAll(career){
      const subjects = await this.subjectRepository.getAll(career)
      return subjects;
   }

   async getById(id:number){
      const subject = await this.subjectRepository.getById(id)
      return subject;
   }

   async update(id:number, request: any){

      const subject = await this.subjectRepository.update(id, request)

      return subject;
   }

   async delete(id: number){
      const subject = await this.subjectRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}