import { HttpStatus, Injectable } from '@nestjs/common';
import { SubjectRepository } from '../../modules/database/repositories/subjectRepository.service';
@Injectable()
export class SubjectService {

    constructor(
        private readonly subjectRepository: SubjectRepository
    ) {}

    async create(request: any){
      let created = {}
      for (let i = 0; i < request.data.length; i++) {
         let body: any = {
            name: request.data[i].name,
            subject_category_id: request.data[i].subject_category_id,
            info: request.data[i].info,
            url: request.data[i].url
         }
         if (request.data[i].subject_key || request.data[i].subject_key == 0) {
            body.subject_id = created[`${request.data[i].subject_key}`].id
         }

         let subject = await this.subjectRepository.create(body) 
         created[`${i}`] = subject
      }  

      return {statusCode: HttpStatus.OK, message: created};
   }

   async getAll(career){
      const subjects = await this.subjectRepository.getAll(career)
      return subjects;
   }

   async getById(id:number){
      const subject = await this.subjectRepository.getById(id)
      return subject;
   }

   async update(request: any){
      let created = {}
      let subject
      for (let i = 0; i < request.data.length; i++) {
         let body: any = {
            name: request.data[i].name,
            subject_category_id: request.data[i].subject_category_id,
            subject_id : request.data[i].subject_id,
            info: request.data[i].info,
            url: request.data[i].url
         }
         if ((request.data[i].subject_key || request.data[i].subject_key == 0) && !body.subject_id) {
            body.subject_id = created[`${request.data[i].subject_key}`].id
         }
         if (request.data[i].id) {
            subject = await this.subjectRepository.update(request.data[i].id, body)
         }else{
            subject = await this.subjectRepository.create(body) 
         }
         created[`${i}`] = subject
      }

      await this.subjectRepository.deleteMany(request.deleteData)

      return subject;
   }

   async delete(id: number){
      const subject = await this.subjectRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}