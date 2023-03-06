import { HttpStatus, Injectable } from '@nestjs/common';
import { SubjectParentRepository } from 'src/modules/database/repositories/subjectParentRepository.service';
import { SubjectRepository } from '../../modules/database/repositories/subjectRepository.service';
@Injectable()
export class SubjectService {

    constructor(
        private readonly subjectRepository: SubjectRepository,
        private readonly subjectParentRepository: SubjectParentRepository
    ) {}

    async create(request: any){
      let created = {}
      for (let i = 0; i < request.data.length; i++) {
         let subjectParents = []
         let body = {
            name: request.data[i].name,
            subject_category_id: request.data[i].subject_category_id,
            info: request.data[i].info,
            url: request.data[i].url,
            prefix: request.data[i].prefix
         }
         for (let parent of request.data[i].subjectParent) {
            if (parent.key || parent.key == 0 || parent.id) {
               if (parent.key || parent.key == 0) {
                  subjectParents.push(created[`${parent.key}`].id)
               }
               if (parent.id) {
                  subjectParents.push(parent.id)
               }
            }
         }

         let subject = await this.subjectRepository.create(body) 
         created[`${i}`] = subject
         
         // save parents
         for (let subjectParent of subjectParents) {
            await this.subjectParentRepository.create({
               subject_id: subject.id,
               subject_parent_id: subjectParent
            })
         }
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
      for (let i = 0; i < request.data.length; i++) {
         let subject
         let subjectParents = []
         let body = {
            name: request.data[i].name,
            subject_category_id: request.data[i].subject_category_id,
            info: request.data[i].info,
            url: request.data[i].url,
            prefix: request.data[i].prefix
         }
         for (let parent of request.data[i].subjectParent) {
            if (parent.key || parent.key == 0 || parent.id) {
               if (parent.key || parent.key == 0) {
                  subjectParents.push(created[`${parent.key}`].id)
               }
               if (parent.id) {
                  subjectParents.push(parent.id)
               }
            }
         }
         if (request.data[i].id) {
            subject = await this.subjectRepository.update(request.data[i].id, body)
         }else{
            subject = await this.subjectRepository.create(body) 
         }
         created[`${i}`] = subject
         // save parents
         await this.subjectParentRepository.deleteMany(request.data[i].deleteParent, subject.id)
         for (let subjectParent of subjectParents) {
            await this.subjectParentRepository.create({
               subject_id: subject.id,
               subject_parent_id: subjectParent
            })
         }
      }

      await this.subjectRepository.deleteMany(request.deleteData)

      return created;
   }

   async delete(id: number){
      const subject = await this.subjectRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}