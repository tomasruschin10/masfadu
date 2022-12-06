import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { UserSubjectRepository } from '../../modules/database/repositories/userSubjectRepository.service';
@Injectable()
export class UserSubjectService {

   constructor(
      private readonly userSubjectRepository: UserSubjectRepository
   ) { }

   async create(request: any) {
      if (request.score && request.score != 0) request.finish = 1
      const userSubject = await this.userSubjectRepository.create(request)
      if (!userSubject) throw new BadRequestException(['incorrect data'])

      return userSubject;
   }

   async getAll() {
      const userSubjects = await this.userSubjectRepository.getAll()
      return userSubjects;
   }

   async getById(id: number) {
      const userSubject = await this.userSubjectRepository.getById(id)
      return userSubject;
   }

   async update(id: number, request: any) {
      if (request.score && request.score != 0) request.finish = 1
      const userSubject = await this.userSubjectRepository.update(id, request)

      return userSubject;
   }

   async delete(id: number) {
      const userSubject = await this.userSubjectRepository.delete(id)


      return { statusCode: 200, message: 'removed' }
   }



}