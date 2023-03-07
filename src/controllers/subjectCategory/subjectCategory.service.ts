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
      let res = { data: [], total: null, on: null, prom: null }
      let on = 0
      let points = 0
      let count = 0
      let total = 0

      let userSubjects = await this.userSubjectRepository.getAll(userData.id, userData.career_id)

      for (let i = 0; i < data.length; i++) {
         let cat = data[i]
         // set categoty data
         let category = {
            id: cat.id,	
            name: cat.name,
            career_id: cat.career_id,
            subject: [],
            available: cat.available || i == 0
         }
         let allFinished = true

         // add subject data
         for (let j = 0; j < cat.subject.length; j++) {
            let sub = cat.subject[j]
            let userSub = userSubjects.find(a => a.subject_id == sub.id)
            let subjectCompleted = true
            let subject = {
               id: sub.id,
               name: sub.name,
               prefix: sub.prefix,
               info: sub.info,
               subject_category_id: sub.subject_category_id,
               available: false,
               userSubject: null,
               subjectParents: []
            }
            total++

            //set userSubject data
            if (userSub) {
               subject.userSubject = {
                  id: userSub.id,
                  user_id: userSub.user_id,
                  subject_id: userSub.subject_id,
                  score: userSub.score,
                  finish: userSub.finish,
                  extra_score: userSub.extra_score
               }
               if (subject.userSubject.score) {
                  points+= subject.userSubject.score
                  count++
               }
               if (subject.userSubject.score >= 4) {
                  on++
               }else {
                  subjectCompleted = false
               }
            } else {
               subjectCompleted = false
            }

            //apply subject parents conditions
            if (i == 0 && sub.subjectParent.length == 0) {
               subject.available = true
            }else {
               let allParentsCompleted = true
               for (let parent of sub.subjectParent) {
                  let userParentSub = userSubjects.find(a => a.subject_id == parent.parent.id)
                  let parentCompleted = true
                  if (!userParentSub || userParentSub.score < 4) {
                     parentCompleted = false
                     subjectCompleted = false
                     allParentsCompleted = false
                  }
                  subject.subjectParents.push({
                     id: parent.parent.id,
                     name: parent.parent.name,
                     completed: parentCompleted
                  })
               }
               subject.available = allParentsCompleted && (category.available || sub.subjectParent.length)
            }
            category.subject.push(subject)
            if (!subjectCompleted) {
               allFinished = false
            }

         }
         if (allFinished && data[i + 1]) {
            data[i + 1]['available'] = true
         }
         res.data.push(category)
      }

      if (points && count) {
         res.prom = parseFloat((points / count).toFixed(2))
      }
      res.total = total
      res.on = on
      return res
   }



}