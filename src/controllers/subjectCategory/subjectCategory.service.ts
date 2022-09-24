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
      let subjectCategorys = await this.subjectCategoryRepository.getAll(data, id)
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

      let userSubjects = await this.userSubjectRepository.getAll(userData.id, userData.career_id)
      data[0].available = true
      for (let i = 0; i < data.length; i++) {
         let allFinished = true
         delete data[i].created_at
         delete data[i].updated_at
         for (let j = 0; j < data[i].subject.length; j++) {
            delete data[i].subject[j].created_at
            delete data[i].subject[j].updated_at
            total++
            data[i].subject[j].userSubject = userSubjects.find(a => a.subject_id == data[i].subject[j].id)
            if (data[i].subject[j].userSubject) {
               delete data[i].subject[j].userSubject.created_at
               delete data[i].subject[j].userSubject.updated_at
               if (data[i].subject[j].userSubject.score >= 4) {
                  on++
               }
               if (data[i].subject[j].userSubject.score) {
                  count++
                  points += data[i].subject[j].userSubject.score
               }
            }
            if ((!data[i].subject[j].userSubject || data[i].subject[j].userSubject.finish == false) && allFinished) {
               allFinished = false
            }
            let subjectData
            if (data[i].subject[j].subject_id) {
               let subject_id = data[i].subject[j].subject_id
               data.map(category => {
                  subjectData = category.subject.find(subject => subject.id == subject_id) || subjectData
               })
               if (subjectData) {
                  if (subjectData && subjectData.userSubject && subjectData.userSubject.finish && subjectData.userSubject.score >= 4) {
                     data[i].subject[j].available = true
                     data[i].subject[j].mainSubject = subjectData.name
                  } else {
                     data[i].subject[j].mainSubject = subjectData.name
                     data[i].subject[j].available = false
                  }
               }
            } else {
               if ((i > 1 && data[i - 1].finish && !data[i].subject[j].available) || i == 0) {
                  data[i].subject[j].available = true
               } else {
                  data[i].subject[j].available = false
               }
            }
         }
         if (parseFloat((points / count).toFixed(2)) < 4) {
            allFinished = false
         }
         if ( i + 1 < data.length) {
            data[i + 1].available = allFinished
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