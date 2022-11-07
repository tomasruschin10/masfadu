import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { UserSubjectRepository } from 'src/modules/database/repositories/userSubjectRepository.service';
import { SubjectCategoryRepository } from '../../modules/database/repositories/subjectCategoryRepository.service';
@Injectable()
export class SubjectCategoryService {

   constructor(
      private readonly subjectCategoryRepository: SubjectCategoryRepository,
      private readonly userSubjectRepository: UserSubjectRepository
   ) { }

   async create(request: any) {

      const subjectCategory = await this.subjectCategoryRepository.create(request)
      if (!subjectCategory) throw new BadRequestException(['incorrect data'])

      return subjectCategory;
   }

   async getAll(data, id) {
      let subjectCategorys = await this.subjectCategoryRepository.getAll(id)
      if (data.userData.userRole[0].role_id == 2) {
         subjectCategorys = await this.addStudentExtraInfo(data.userData, subjectCategorys)
      }
      return subjectCategorys;
   }

   async getById(id: number) {
      const subjectCategory = await this.subjectCategoryRepository.getById(id)
      return subjectCategory;
   }

   async update(id: number, request: any) {

      const subjectCategory = await this.subjectCategoryRepository.update(id, request)

      return subjectCategory;
   }

   async delete(id: number) {
      const subjectCategory = await this.subjectCategoryRepository.delete(id)


      return { statusCode: 200, message: 'removed' }
   }

   async addStudentExtraInfo(userData, data) {
      let res = { data: null, total: null, on: null, prom: null, correlations: null }
      let on = 0
      let points = 0
      let count = 0
      let total = 0
      let corelative = {}

      let userSubjects = await this.userSubjectRepository.getAll(userData.id, userData.career_id)

      for (let i = 0; i < data.length; i++) {
         delete data[i].created_at
         delete data[i].updated_at
         let c_available = false
         for (let j = 0; j < data[i].subject.length; j++) {
            data[i].subject[j].userSubject = userSubjects.find(a => a.subject_id == data[i].subject[j].id);

            delete data[i].subject[j].created_at
            delete data[i].subject[j].updated_at
            delete data[i].subject[j].userSubject?.created_at
            delete data[i].subject[j].userSubject?.updated_at
            delete data[i].subject[j].mainSubject?.created_at
            delete data[i].subject[j].mainSubject?.updated_at

            let s_available = true
            for (let k = 0; k < data[i].subject[j].subjects.length; k++) {
               delete data[i].subject[j].subjects[k]?.created_at
               delete data[i].subject[j].subjects[k]?.updated_at
               let s_data = (userSubjects.find(a => a.subject_id == data[i].subject[j].subjects[k].id))

               data[i].subject[j].subjects[k].score = s_data?.score
               data[i].subject[j].subjects[k].finish = s_data?.finish
               s_available = (s_data?.score >= 4) && s_available
            }
            data[i].subject[j].available = s_available
            c_available = s_available || c_available
         }
         data[i].available = c_available
      }
      data[0].available = true
      for (let i = 0; i < data.length; i++) {
         let allFinished = true
         let available = false
         for (let j = 0; j < data[i].subject.length; j++) {
            total++
            if (data[i].subject[j].userSubject) {
               if (data[i].subject[j].userSubject.score != 0) {
                  count++
                  points += data[i].subject[j].userSubject.score
               }
               if (data[i].subject[j].userSubject.score >= 4) {
                  on++
                  available = true
               } else { allFinished = false }
            }
         }
         data[i].available = data[i].available || available

         if (i + 1 < data.length) {
            data[i + 1].available = data[i + 1].available || allFinished
         }
      }

      if (points && count) {
         res.prom = parseFloat((points / count).toFixed(2))
      }
      res.total = total
      res.on = on
      res.data = data
      return res
   }



}